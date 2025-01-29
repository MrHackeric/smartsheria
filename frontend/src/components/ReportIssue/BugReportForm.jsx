import React, { useState } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { db, addDoc, collection } from "../../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const BugReportForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    issueDescription: Yup.string().required("Description is required").min(10, "Must be at least 10 characters"),
    systemEnvironment: Yup.string().required("System environment is required"),
    agreeToTerms: Yup.bool().oneOf([true], "You must agree to the privacy policy and terms of use").required(),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      // Add bug report to Firebase collection
      await addDoc(collection(db, "bugReports"), {
        ...values,
        timestamp: new Date(),
      });
      alert("Bug report submitted successfully.");
      navigate("/dashboard"); // Navigate to the dashboard or other page after submission
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting bug report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Report a System Bug or Issue</h2>
      <Formik
        initialValues={{
          issueDescription: "",
          systemEnvironment: "",
          agreeToTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <Field
                name="issueDescription"
                as={TextField}
                label="Issue Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                helperText={touched.issueDescription ? errors.issueDescription : ""}
                error={touched.issueDescription && !!errors.issueDescription}
              />
            </div>
            <div>
              <Field
                name="systemEnvironment"
                as={TextField}
                label="System Environment (OS, Browser, etc.)"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                helperText={touched.systemEnvironment ? errors.systemEnvironment : ""}
                error={touched.systemEnvironment && !!errors.systemEnvironment}
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Field
                    name="agreeToTerms"
                    type="checkbox"
                    component={Checkbox}
                    color="primary"
                  />
                }
                label={
                  <span>
                    I agree to the <a href="/privacy-policy" className="text-blue-500">Privacy Policy</a> and <a href="/terms-of-use" className="text-blue-500">Terms of Use</a>.
                  </span>
                }
              />
              {touched.agreeToTerms && errors.agreeToTerms && (
                <div className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</div>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={submitting}
                className="w-full"
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BugReportForm;
