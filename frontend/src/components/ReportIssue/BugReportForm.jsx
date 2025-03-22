import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Checkbox, FormControlLabel, TextField, Container, Paper, Typography, CircularProgress } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const BugReportForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    operatingSystem: Yup.string().required("Operating system is required"),
    browser: Yup.string().required("Browser is required"),
    issueDescription: Yup.string().required("Issue description is required").min(10, "Must be at least 10 characters"),
    agreeToTerms: Yup.bool().oneOf([true], "You must agree to the privacy policy and terms of use").required(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
    try {
        await axios.post("http://localhost:5000/api/bugReports", values);
        alert("Bug report submitted successfully.");
        resetForm();
        navigate("/report");
    } catch (error) {
        console.error("Error submitting bug report:", error);
        alert("Error submitting bug report. Please try again.");
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} className="p-6 mt-10 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Report a System Bug or Issue</h2>
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
            <Form className="space-y-4">
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
                name="operatingSystem"
                as={TextField}
                label="Operating System"
                variant="outlined"
                fullWidth
                error={touched.operatingSystem && !!errors.operatingSystem}
                helperText={touched.operatingSystem ? errors.operatingSystem : ""}
              />
              <Field
                name="browser"
                as={TextField}
                label="Browser"
                variant="outlined"
                fullWidth
                error={touched.browser && !!errors.browser}
                helperText={touched.browser ? errors.browser : ""}
              />
              <Field
                name="issueDescription"
                as={TextField}
                label="Issue Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                error={touched.issueDescription && !!errors.issueDescription}
                helperText={touched.issueDescription ? errors.issueDescription : ""}
              />
              <Field name="agreeToTerms">
                {({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} color="primary" />}
                    label={<span>I agree to the <a href="/privacy-policy" className="text-blue-500">Privacy Policy</a> and <a href="/terms-of-use" className="text-blue-500">Terms of Use</a>.</span>}
                  />
                )}
              </Field>
              {touched.agreeToTerms && errors.agreeToTerms && (
                <Typography color="error" variant="body2">
                  {errors.agreeToTerms}
                </Typography>
              )}
              <div className="flex justify-center">
                <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={submitting}>
                  {submitting ? <CircularProgress size={24} color="inherit" /> : "Submit Report"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default BugReportForm;
