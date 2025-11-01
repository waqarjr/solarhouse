import { useEffect } from "react";
import { useRouter } from "next/navigation";

const defaultValues = {
  minPrice: 10000,
  maxPrice: 90000,
  filter: null,
  showProduct: "12",
  select: "date,desc",
};

const useUpdateShopURL = (minPrice, maxPrice, filter, showProduct, select) => {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (filter && filter !== defaultValues.filter)
      params.append("product-cata", filter);

    if (minPrice !== defaultValues.minPrice)
      params.append("min-price", minPrice);

    if (maxPrice !== defaultValues.maxPrice)
      params.append("max-price", maxPrice);

    if (showProduct !== defaultValues.showProduct)
      params.append("per_page", showProduct);

    if (select !== defaultValues.select) {
      const [orderby, order] = select.split(",");
      params.append("orderby", orderby);
      if (order) params.append("order", order);
    }

    const query = params.toString();
    const url = query ? `/shop?${query}` : "/shop";

    router.replace(url); // instantly updates the route without reload
  }, [minPrice, maxPrice, filter, showProduct, select]);
};

export default useUpdateShopURL;
