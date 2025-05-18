"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createAccount } from "@/lib/actions/user.actions";

type AuthType = "sign up" | "sign in";

const AuthForm = ({ type }: { type: AuthType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountId, setAccountId] = useState(null);

  const handleClick = async (values: FormData) => {
    setIsLoading(true);
    const username = values.get("username")?.toString() || "";
    const email = values.get("email")?.toString() || "";
    const testPassword = values.get("testPassword")?.toString() || "";
    const password = values.get("password") || "";

    if (testPassword !== password) {
      setIsLoading(false);
      return;
    }

    try {
      const user = await createAccount({ username, email });

      setAccountId(user.accountID);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="items-center justify-center gap-5 border-1 border-black rounded-2xl p-5 w-md">
      <form action={handleClick}>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          className="mb-5"
        />
        {type == "sign up" && (
          <>
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Enter Username"
              name="username"
              className="mb-5"
            />
          </>
        )}
        <Label htmlFor="password">Password</Label>
        <Input
          type={type == "sign in" ? "password" : "text"}
          name="testPassword"
          placeholder="Enter Password"
          className="mb-5"
        />
        {type == "sign up" && (
          <>
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="mb-5"
            />
          </>
        )}
        <div className=" flex items-center justify-center">
          <Button type="submit">
            {type == "sign up" ? "Sign Up" : "Login"}
          </Button>
        </div>
      </form>
      <Label htmlFor="h1" className="justify-center mt-20 mb-10">
        OR {type.toUpperCase()} USING
      </Label>
      <div className="flex items-center justify-center gap-15">
        <Link href={"/"} className="items-center justify-center">
          <Image
            src={"/google_logo.png"}
            alt="Google Logo"
            width={28}
            height={28}
            style={{ objectFit: "contain" }}
          />
        </Link>
        <Link href={"/"} className="items-center justify-center">
          <Image
            src={"/github_logo.png"}
            alt="GitHub Logo"
            width={32}
            height={32}
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
