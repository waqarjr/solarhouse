"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RegisterForm() {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
  });

  // ✅ 2. Initial form values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    address: "",
  };

  // ✅ 3. Handle form submission
  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Register Form
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}     // ✅ real-time validation
        validateOnBlur={true}       // ✅ show error when user leaves input
      >
        {({ touched, errors }) => (
          <Form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-medium">Name</label>
              <Field
                name="name"
                type="text"
                placeholder="Enter your name"
                className={`w-full p-2 border rounded-lg ${
                  touched.name && errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium">Email</label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full p-2 border rounded-lg ${
                  touched.email && errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Enter your password"
                className={`w-full p-2 border rounded-lg ${
                  touched.password && errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium">Address</label>
              <Field
                name="address"
                as="textarea"
                placeholder="Enter your address"
                className={`w-full p-2 border rounded-lg ${
                  touched.address && errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
