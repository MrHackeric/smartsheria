import React, { useEffect, useState } from "react";
import { Button, TextField, Divider, Collapse } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";

const EditProfile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${currentUser._id}`, { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) fetchUserData();
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
      await axios.put(`/api/users/${currentUser._id}`, values, { withCredentials: true });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile. Try again.");
    }
  };

  const toggleAdvancedSettings = () => setAdvancedSettingsOpen((prev) => !prev);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-20">
      <Formik
        enableReinitialize
        initialValues={{
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                name="firstName"
                as={TextField}
                label="First Name"
                variant="outlined"
                fullWidth
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName ? errors.firstName : ""}
              />
              <Field
                name="lastName"
                as={TextField}
                label="Last Name"
                variant="outlined"
                fullWidth
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName ? errors.lastName : ""}
              />
            </div>
            <Field
              name="username"
              as={TextField}
              label="Username"
              variant="outlined"
              fullWidth
              error={touched.username && !!errors.username}
              helperText={touched.username ? errors.username : ""}
            />
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
            <Divider className="my-4" />
            <Button fullWidth variant="outlined" onClick={toggleAdvancedSettings}>
              Advanced Settings
            </Button>
            <Collapse in={advancedSettingsOpen}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outlined" color="warning" fullWidth className="mt-2">
                  Deactivate Account
                </Button>
                <Button variant="outlined" color="error" fullWidth className="mt-2">
                  Delete Account
                </Button>
              </div>
            </Collapse>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
