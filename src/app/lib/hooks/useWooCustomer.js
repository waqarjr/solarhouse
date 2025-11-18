'use client'

import { useCallback, useEffect, useState } from "react";
import api from "@/app/lib/api";
import useStoreData from "@/app/lib/useStoreData";

const useWooCustomer = () => {
  const { user } = useStoreData();
  const [customer, setCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomer = useCallback(async () => {
    if (!user || (!user.id && !user.email)) {
      setCustomer(null);
      return;
    }

    setLoadingCustomer(true);
    try {
      let resolvedCustomer = null;

      if (user.id) {
        try {
          const { data } = await api.get(`/customers/${user.id}`);
          resolvedCustomer = data;
        } catch (err) {
          if (err.response?.status !== 404) {
            throw err;
          }
        }
      }

      if (!resolvedCustomer && user.email) {
        const { data } = await api.get("/customers", {
          params: { email: user.email, per_page: 1 },
        });
        resolvedCustomer = data?.[0] || null;
      }

      if (!resolvedCustomer) {
        throw new Error("Customer record not found");
      }

      setCustomer(resolvedCustomer);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch customer:", err.message);
      setError(err);
    } finally {
      setLoadingCustomer(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  return { user, customer, loadingCustomer, error, refreshCustomer: fetchCustomer };
};

export default useWooCustomer;

