import * as React from "react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="lg:p-4 lg:m-4 sm:p-0 sm:m-0 animated fadeIn">{children}</div>
);
