import React, { useEffect, useState, useContext } from "react"; // Import useContext
import { Button, TextField, Divider, Collapse } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Assuming AuthContext is imported somewhere in the code
import { useAuth } from '../../AuthContext'; // Example import path

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
  const currentUser = useContext(useAuth); // Now useContext will work

  useEffect(() => {
    if (!currentUser || !currentUser._id) {
      console.warn("No current user found. Fetch stopped.");
      setLoading(false);
      return;
    }
    const fetchUserData = async () => {
      try {
        console.log("Fetching data for user:", currentUser?._id); // Debugging user ID
        const response = await axios.get(`/fetch/users/${currentUser?._id}`, { withCredentials: true });
    
        if (!response.data || typeof response.data !== "object") {
          console.error("Invalid user data received:", response.data);
          return;
        }
    
        console.log("User Data Response:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [currentUser]); // Adding currentUser to the dependency array

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .required("Phone number is required"),
  });

  const handleSubmit = async (values) => {
    try {
      console.log("Submitting updated profile data:", values);

      const token = sessionStorage.getItem("authToken");

      if (!token) {
        alert("Authentication required. Please log in again.");
        return;
      }

      await axios.put(`/fetch/users/${userData._id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

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
          fullname: userData.fullname || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <Field
              name="fullname"
              as={TextField}
              label="Full Name"
              variant="outlined"
              fullWidth
              error={touched.fullname && !!errors.fullname}
              helperText={touched.fullname ? errors.fullname : ""}
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
              name="phoneNumber"
              as={TextField}
              label="Phone Number"
              variant="outlined"
              fullWidth
              error={touched.phoneNumber && !!errors.phoneNumber}
              helperText={touched.phoneNumber ? errors.phoneNumber : ""}
            />
            <Divider className="my-4" />
            <p className="text-sm text-gray-600 italic">
              To change your password, please log out, proceed to login, select "Forgot Password," and follow the instructions.
            </p>
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
