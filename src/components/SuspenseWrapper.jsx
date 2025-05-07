import React from "react";
import PageWrapper from "./PageWrapper";

export default function Suspense({ children }) {
  return (
    <React.Suspense fallback={<PageWrapper height={"100vh"} className="flex justify-center items-center">Loading...</PageWrapper>}>{children}</React.Suspense>
  );
}