"use client";

import React from "react";
import { account } from "@/lib/appwrite/auth";

const Navbar = () => {
  const logout = async () => {
    await account.deleteSession("current");
    window.location.href = "/sign-in";
  };

  return (
    <div className="center-flex bg-black h-20">
      <button
        className="button text-white bg-red-600 h-fit p-2 rounded-2xl"
        onClick={async (e) => await logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
