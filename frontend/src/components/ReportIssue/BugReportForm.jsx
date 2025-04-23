import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Bug, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  operatingSystem: Yup.string().required("Operating system is required"),
  browser: Yup.string().required("Browser is required"),
  issueDescription: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Issue description is required"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms")
    .required("Required"),
});

const BugReportForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/bugReports", values);
      alert("Bug report submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting bug report:", error);
      alert("Error submitting bug report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-6 sm:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Bug className="mx-auto h-14 w-14 text-indigo-600 animate-bounce" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Report an Issue
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Help us improve by reporting any bugs you encounter
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="bg-white p-8 rounded-3xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Formik
            initialValues={{
              email: userEmail || "",
              operatingSystem: "",
              browser: "",
              issueDescription: "",
              agreeToTerms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                    />
                    {touched.email && errors.email && (
                      <div className="mt-1 flex items-center text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Operating System Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label
                    htmlFor="operatingSystem"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Operating System
                  </label>
                  <div className="mt-1">
                    <Field
                      id="operatingSystem"
                      name="operatingSystem"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                    />
                    {touched.operatingSystem && errors.operatingSystem && (
                      <div className="mt-1 flex items-center text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.operatingSystem}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Browser Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label
                    htmlFor="browser"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Browser
                  </label>
                  <div className="mt-1">
                    <Field
                      id="browser"
                      name="browser"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                    />
                    {touched.browser && errors.browser && (
                      <div className="mt-1 flex items-center text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.browser}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Issue Description Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label
                    htmlFor="issueDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Issue Description
                  </label>
                  <div className="mt-1">
                    <Field
                      as="textarea"
                      id="issueDescription"
                      name="issueDescription"
                      rows={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                    />
                    {touched.issueDescription && errors.issueDescription && (
                      <div className="mt-1 flex items-center text-sm text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.issueDescription}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Terms and Conditions Checkbox */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the{" "}
                      <a
                        href="/privacy-policy"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="/terms-of-use"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Terms of Use
                      </a>
                    </label>
                  </div>
                  {touched.agreeToTerms && errors.agreeToTerms && (
                    <div className="mt-1 flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.agreeToTerms}
                    </div>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Report"
                    )}
                  </button>
                </motion.div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default BugReportForm;
