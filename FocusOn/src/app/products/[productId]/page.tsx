"use client";

import { withAuth } from "@/commons/hocs/withAuth";
import ProductDetail from "@/components/product-detail";

const ProductsDetailPage = () => {
  return (
    <>
      <ProductDetail />
    </>
  );
};
export default withAuth(ProductsDetailPage);
