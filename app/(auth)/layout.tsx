import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex">
      <div className="flex bg-main w-1/2 h-svh items-center justify-center">
        <Image
          src={"/logo-large.png"}
          alt="logo"
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
