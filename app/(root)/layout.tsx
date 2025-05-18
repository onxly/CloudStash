import React from "react";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      RootLayout
      {children}
    </>
  );
};

export default RootLayout;
