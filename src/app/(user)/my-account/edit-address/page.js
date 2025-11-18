'use client'

import { useEffect, useState } from 'react';
import { FilePlus } from 'lucide-react';
import Swal from 'sweetalert2';
import api from '@/app/lib/api';
import useWooCustomer from '../hooks/useWooCustomer';

const billingDefaults = {
  first_name: '',
  last_name: '',
  company: '',
  address_1: '',
  address_2: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  phone: '',
  email: '',
};

const shippingDefaults = {
  first_name: '',
  last_name: '',
  company: '',
  address_1: '',
  address_2: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
};

export default function AddressesSection() {
  const { customer, loadingCustomer, refreshCustomer } = useWooCustomer();
  const [billingForm, setBillingForm] = useState(billingDefaults);
  const [shippingForm, setShippingForm] = useState(shippingDefaults);
  const [saving, setSaving] = useState({ billing: false, shipping: false });

  useEffect(() => {
    if (!customer) return;
    setBillingForm({ ...billingDefaults, ...customer.billing });
    setShippingForm({ ...shippingDefaults, ...customer.shipping });
  }, [customer]);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitAddress = async (type) => {
    if (!customer?.id) return;
    setSaving((prev) => ({ ...prev, [type]: true }));
    try {
      await api.put(`/customers/${customer.id}`, {
        [type]: type === 'billing' ? billingForm : shippingForm,
      });
      await refreshCustomer();
      Swal.fire("Success", `${type === 'billing' ? 'Billing' : 'Shipping'} address updated.`, "success");
    } catch (error) {
      console.error("Failed to update address:", error.message);
      Swal.fire("Error", "Unable to update the address right now.", "error");
    } finally {
      setSaving((prev) => ({ ...prev, [type]: false }));
    }
  };

  if (loadingCustomer) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500">Loading your addresses...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-yellow-800">
        Please login again to manage your addresses.
      </div>
    );
  }

  const renderInput = ({ label, name, value, onChange, required = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  return (
    <>
      <p className="text-gray-600 text-sm mb-8">
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FilePlus className="w-6 h-6 text-blue-500" />
            Billing address
          </h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); submitAddress('billing'); }}>
            {renderInput({ label: "First name", name: "first_name", value: billingForm.first_name, onChange: handleBillingChange, required: true })}
            {renderInput({ label: "Last name", name: "last_name", value: billingForm.last_name, onChange: handleBillingChange, required: true })}
            {renderInput({ label: "Company name (optional)", name: "company", value: billingForm.company, onChange: handleBillingChange })}
            {renderInput({ label: "Country / Region", name: "country", value: billingForm.country, onChange: handleBillingChange, required: true })}
            {renderInput({ label: "Street address", name: "address_1", value: billingForm.address_1, onChange: handleBillingChange, required: true })}
            {renderInput({ label: "Apartment, suite, unit, etc. (optional)", name: "address_2", value: billingForm.address_2, onChange: handleBillingChange })}
            {renderInput({ label: "Town / City", name: "city", value: billingForm.city, onChange: handleBillingChange, required: true })}
            {renderInput({ label: "State / County", name: "state", value: billingForm.state, onChange: handleBillingChange, required: true })}
            {renderInput({ label: "Postcode / ZIP", name: "postcode", value: billingForm.postcode, onChange: handleBillingChange, required: true })}
            {renderInput({ label: "Phone", name: "phone", value: billingForm.phone, onChange: handleBillingChange, required: true })}
            {renderInput({ label: "Email address", name: "email", value: billingForm.email, onChange: handleBillingChange, required: true })}

            <button
              type="submit"
              disabled={saving.billing}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
            >
              {saving.billing ? "Saving..." : "Save billing address"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FilePlus className="w-6 h-6 text-blue-500" />
            Shipping address
          </h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); submitAddress('shipping'); }}>
            {renderInput({ label: "First name", name: "first_name", value: shippingForm.first_name, onChange: handleShippingChange, required: true })}
            {renderInput({ label: "Last name", name: "last_name", value: shippingForm.last_name, onChange: handleShippingChange, required: true })}
            {renderInput({ label: "Company name (optional)", name: "company", value: shippingForm.company, onChange: handleShippingChange })}
            {renderInput({ label: "Country / Region", name: "country", value: shippingForm.country, onChange: handleShippingChange, required: true })}
            {renderInput({ label: "Street address", name: "address_1", value: shippingForm.address_1, onChange: handleShippingChange, required: true })}
            {renderInput({ label: "Apartment, suite, unit, etc. (optional)", name: "address_2", value: shippingForm.address_2, onChange: handleShippingChange })}
            {renderInput({ label: "Town / City", name: "city", value: shippingForm.city, onChange: handleShippingChange, required: true })}
            {renderInput({ label: "State / County", name: "state", value: shippingForm.state, onChange: handleShippingChange, required: true })}
            {renderInput({ label: "Postcode / ZIP", name: "postcode", value: shippingForm.postcode, onChange: handleShippingChange, required: true })}

            <button
              type="submit"
              disabled={saving.shipping}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
            >
              {saving.shipping ? "Saving..." : "Save shipping address"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}