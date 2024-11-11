"use client";

import { withAuth } from "@/commons/hocs/withAuth";
import ProductDetail from "@/components/product-detail/detail";
import ProductDetailQuestion from "@/components/product-detail/question-write";
import ProductDetailQuestionList from "@/components/product-detail/question-list";

const ProductsDetailPage = () => {
  return (
    <>
      <ProductDetail />
      <ProductDetailQuestion />
      <ProductDetailQuestionList />
    </>
  );
};
export default withAuth(ProductsDetailPage);
