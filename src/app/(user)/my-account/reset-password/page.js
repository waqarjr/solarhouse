"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Page = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);

    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mb-6 bg-white   ">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Password Change</h3>

        <div className="mb-6">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <input type="password" id="currentPassword" name="currentPassword" placeholder="Enter current password" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.currentPassword && formik.errors.currentPassword ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
          {formik.touched.currentPassword && formik.errors.currentPassword && (<p className="text-red-500 text-sm mt-1">{formik.errors.currentPassword}</p>)}
        </div>

        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900 mb-2">New Password </label>
          <input type="password" id="newPassword" name="newPassword" placeholder="Enter new password" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="new-password" className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.newPassword && formik.errors.newPassword ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
          {formik.touched.newPassword && formik.errors.newPassword && (<p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>)}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-2">Confirm New Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="confirm-password" className={`w-full px-4 py-3 border-b-2 outline-none transition ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (<p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>)}
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={formik.isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">Update Password</button>
        </div>
      </form>
    </>
  );
};

export default Page;
