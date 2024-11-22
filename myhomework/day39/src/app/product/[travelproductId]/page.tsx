"use client";
import CommentList from "@/components/product-detail/comment-list";
import CommentWrite from "@/components/product-detail/comment-write";
import ProductDetail from "@/components/product-detail/detail";
import React from "react";

export default function Product() {
  return (
    <>
      <ProductDetail />
      <CommentWrite />
      <CommentList />
    </>
  );
}
