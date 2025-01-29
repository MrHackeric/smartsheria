import React, { useEffect, useState } from "react";
import { Button, TextField, Avatar, Divider, IconButton, Collapse, Tooltip } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { db, doc, getDoc, updateDoc } from "../../utils/firebase-config";
import { useAuth } from "../../utils/AuthContext";
import { CopyAll } from "@mui/icons-material";

const EditProfile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        setLoading(false);
      } else {
        console.error("User document does not exist.");
      }
    };
    fetchUserData();
  }, [currentUser]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .required("Phone is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await updateDoc(doc(db, "users", currentUser.uid), values);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile. Try again.");
    }
  };

  const toggleAdvancedSettings = () => setAdvancedSettingsOpen((prev) => !prev);

  const copyProfileLink = () => {
    const profileLink = `https://example.com/profile/${userData.username}`;
    navigator.clipboard.writeText(profileLink);
    alert("Profile link copied to clipboard!");
  };

  return (
    <div className="max-w-lg max-h-30 mx-auto bg-white shadow-lg rounded-xl p-6 mt-20">
      <div>

        <Formik
          enableReinitialize
          initialValues={{
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            username: userData.username || "",
            email: userData.email || "",
            bio: userData.bio || "",
            phone: userData.phone || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  name="fullName"
                  as={TextField}
                  label="Full Names"
                  variant="outlined"
                  fullWidth
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName ? errors.firstName : ""}
                />
              <Field
                name="username"
                as={TextField}
                label="Username"
                variant="outlined"
                fullWidth
                error={touched.username && !!errors.username}
                helperText={touched.username ? errors.username : ""}
              />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                name="email"
                as={TextField}
                label="Email"
                variant="outlined"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={touched.email ? errors.email : ""}
              />
              <Field
                name="phone"
                as={TextField}
                label="Phone Number"
                variant="outlined"
                fullWidth
                error={touched.phone && !!errors.phone}
                helperText={touched.phone ? errors.phone : ""}
              />
              </div>
              <Divider className="my-4" />
              <Button
                fullWidth
                variant="outlined"
                onClick={toggleAdvancedSettings}
                className="text-sm"
              >
                Advanced Settings
              </Button>
              <Collapse in={advancedSettingsOpen}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outlined"
                  color="warning"
                  fullWidth
                  className="mt-2"
                >
                  Deactivate Account
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  className="mt-2"
                >
                  Delete Account
                </Button>
              </div>
              </Collapse>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
