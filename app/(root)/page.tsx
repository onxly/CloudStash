"use client";

import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite/auth";
import { Models } from "appwrite";

const Home = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch((err) => {
        console.log("Not logged in", err);
        window.location.href = "/sign-in";
      });
  }, []);

  return <div>Hello {user?.name}</div>;
};

export default Home;
