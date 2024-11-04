"use client";

import { withAuth } from "@/commons/hocs/withAuth";
import ProductDetail from "@/components/product-detail";
import ContactModal from "@/components/product-detail/contact-modal";

const ProductsDetailPage = () => {
  return (
    <>
      <ProductDetail />
    </>
  );
};
export default withAuth(ProductsDetailPage);
