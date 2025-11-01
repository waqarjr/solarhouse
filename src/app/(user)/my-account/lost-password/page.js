"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" }); 
  const [btnLoading, setBtnLoading] = useState(false);
  const [saveLoading ,setSaveLoading] = useState(false); 

  const searchParams = useSearchParams();
  const router = useRouter();

  const key = searchParams.get("key");
  const login = searchParams.get("login");
  const id = searchParams.get("id");

  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        setBtnLoading(true);
        const response = await axios.post("/api/auth/lostpassword", values);
        const { valid } = response.data;

        if (valid) {
          setAlert({ type: "success", message: "Email sent successfully. Please check your inbox to reset your password." });
        } else {
          setAlert({ type: "error", message: "This user does not exist in our database. Please use another email or register again." });
        }
      } catch (error) {
        setAlert({ type: "error", message: "Something went wrong. Please try again later." });
      } finally {
        setBtnLoading(false);
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "At least one uppercase letter")
        .matches(/[a-z]/, "At least one lowercase letter")
        .matches(/\d/, "At least one number")
        .matches(/[@$!%*?&#]/, "At least one special character")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setSaveLoading(true);
        const response = await axios.put("/api/auth/lostpassword", { password: values, id });
        if (response.data.valid) {
          await Swal.fire({
            icon: "success",
            title: "Password Updated!",
            text: "Your password has been updated successfully.",
            confirmButtonColor: "#3085d6",
          });
          router.push("/my-account");
        } 
      } catch (err) {
        setAlert({ type: "error", message: "Something went wrong. Please try again later." });
      } finally{
        setSaveLoading(false);
      }
    },
  });

  useEffect(() => {
    const validateKey = async () => {
      if (!key || !id || !login) {
        setLoading(false);
        return;
      }

      try {
        const fullUrl = window.location.href;
        const link = fullUrl.split("?")[1];
        const complete = `https://solarhouse.pk/wp-json/custom-api/v3/validate-reset-key?${link}`;
        const response = await axios.get(complete);

        if (response.status === 200) {
          setLoading(false);
        } else {
          setAlert({ type: "error", message: "Your reset link has expired or is invalid. Please request a new one." });
          router.replace("/my-account/lost-password");
        }
      } catch {
        setAlert({ type: "error", message: "Your reset link has expired or is invalid. Please request a new one." });
        router.replace("/my-account/lost-password");
      } finally {
        setLoading(false);
      }
    };

    validateKey();
  }, [key, id, login, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-[400px] p-8 bg-white rounded-lg shadow">
          <div className="mb-3 h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="mb-6 h-12 w-full bg-gray-100 border border-gray-200 rounded animate-pulse"></div>
          <div className="h-12 w-full bg-blue-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (key && id && login && alert.type !== "error") {
    return (
      <div className="w-full max-w-[400px] mx-auto min-h-[400px] grid place-items-center p-6 rounded-lg">
        <form onSubmit={passwordFormik.handleSubmit} className="w-full space-y-8 flex flex-col">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
            <input type="password" name="password" value={passwordFormik.values.password} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} autoComplete="on" className={`w-full px-4 py-3 border-b-2 outline-none transition ${passwordFormik.touched.password && passwordFormik.errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
            {passwordFormik.touched.password && passwordFormik.errors.password && <p className="text-red-500">{passwordFormik.errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password <span className="text-red-500">*</span></label>
            <input type="password" name="confirmPassword" value={passwordFormik.values.confirmPassword} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} autoComplete="on" className={`w-full px-4 py-3 border-b-2 outline-none transition ${passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
            {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && <p className="text-red-500">{passwordFormik.errors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={saveLoading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            {btnLoading ? "Loading..." : "Save"}
          </button> 
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] mx-auto min-h-[400px] grid place-items-center p-6 rounded-lg">
      <div className="w-full flex flex-col items-center justify-center gap-4 relative">

        {alert.message && (
          <div className={`w-full p-3 rounded-md flex justify-between items-center animate-fadeIn shadow-sm ${alert.type === "error" ? "bg-red-50 border border-red-200 text-red-700" : "bg-green-50 border border-green-200 text-green-700"}`}>
            <p className="text-sm font-medium">{alert.message}</p>
            <button onClick={() => setAlert({ type: "", message: "" })} className="text-lg font-bold hover:opacity-70">&times;</button>
          </div>
        )}

        <p className="text-center text-gray-700 text-sm md:text-base leading-relaxed">
          Lost your password? Please enter your email address. You’ll receive a link to create a new password via email.
        </p>

        <form onSubmit={emailFormik.handleSubmit} className="w-full space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
            <input type="email" name="email" value={emailFormik.values.email} onChange={emailFormik.handleChange} onBlur={emailFormik.handleBlur} autoComplete="on" className={`w-full px-4 py-3 border-b-2 outline-none transition ${emailFormik.touched.email && emailFormik.errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
            {emailFormik.touched.email && emailFormik.errors.email && <p className="text-red-500">{emailFormik.errors.email}</p>}
          </div>

          <button type="submit" disabled={btnLoading} className={`w-full px-4 py-2 text-white font-semibold rounded-md transition duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${btnLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"}`}>
            {btnLoading ? "Loading..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
