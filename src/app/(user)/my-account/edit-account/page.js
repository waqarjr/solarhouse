'use client'

import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import api from '@/app/lib/api';
import useStoreData from '@/app/lib/useStoreData';
import useWooCustomer from '../hooks/useWooCustomer';

const initialState = {
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const EditAccountPage = () => {
  const { setUser } = useStoreData();
  const { customer, loadingCustomer, refreshCustomer } = useWooCustomer();
  const [values, setValues] = useState(initialState);
  const [saving, setSaving] = useState(false);

  const nickname = useMemo(() => {
    if (!customer?.meta_data) return '';
    const entry = customer.meta_data.find((meta) => meta.key === 'nickname');
    return entry?.value || '';
  }, [customer]);

  useEffect(() => {
    if (!customer) return;
    setValues((prev) => ({
      ...prev,
      firstName: customer.first_name || customer.billing?.first_name || '',
      lastName: customer.last_name || customer.billing?.last_name || '',
      displayName: nickname || customer.username || customer.first_name || '',
      email: customer.email || customer.billing?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  }, [customer, nickname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const upsertMeta = (meta, key, value) => {
    if (!value) return meta;
    const list = meta ? [...meta] : [];
    const index = list.findIndex((entry) => entry.key === key);
    if (index > -1) {
      list[index] = { ...list[index], value };
    } else {
      list.push({ key, value });
    }
    return list;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer?.id) return;

    if (!values.firstName || !values.lastName || !values.displayName || !values.email) {
      Swal.fire("Missing fields", "Please complete all required fields.", "warning");
      return;
    }

    if (values.newPassword && values.newPassword !== values.confirmPassword) {
      Swal.fire("Passwords do not match", "Please confirm your new password.", "warning");
      return;
    }

    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      billing: {
        ...customer.billing,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
      },
      shipping: {
        ...customer.shipping,
        first_name: values.firstName,
        last_name: values.lastName,
      },
      meta_data: upsertMeta(customer.meta_data, 'nickname', values.displayName),
    };

    if (values.newPassword) {
      payload.password = values.newPassword;
    }

    try {
      setSaving(true);
      await api.put(`/customers/${customer.id}`, payload);
      await refreshCustomer();

      try {
        const verifyRes = await axios.post("/api/auth/verify");
        if (verifyRes.data.valid) {
          setUser(verifyRes.data.message);
        }
      } catch (err) {
        console.warn("Unable to refresh session user:", err.message);
      }

      Swal.fire("Success", "Account details updated successfully.", "success");
    } catch (error) {
      console.error("Failed to update account:", error.message);
      Swal.fire("Error", "Unable to update your account right now.", "error");
    } finally {
      setSaving(false);
      setValues((prev) => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    }
  };

  if (loadingCustomer) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-800">
        Please login again to manage your account details.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            First name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Last name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Display name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="displayName"
          value={values.displayName}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-600 mt-2">
          This will be how your name will be displayed in the account section and in reviews.
        </p>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Email address <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-900">Password change</h2>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Current password (leave blank to leave unchanged)
          </label>
          <input
            type="password"
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              New password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Confirm new password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
};

export default EditAccountPage;