"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { createAccount } from "@/lib/actions/user.actions";
import { Poppins } from "next/font/google";
import { account } from "@/lib/appwrite/auth";
import { OAuthProvider } from "appwrite";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OTPModal from "./OTPModal";

type AuthType = "sign up" | "sign in";

const loginWithOAuth = async (provider: OAuthProvider) => {
  account.createOAuth2Session(
    provider,
    `${window.location.origin}`, // success redirect
    `${window.location.origin}/sign-up` // failure redirect
  );
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const authFormSchema = (type: AuthType) => {
  return z.object({
    email: z.string().email(),
    username:
      type == "sign up" ? z.string().min(2).max(50) : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: AuthType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [accountId, setAccountId] = useState<string>();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmitSignUp = async (values: z.infer<typeof formSchema>) => {
    const username = values.username;
    const email = values.email;
    try {
      const user = await createAccount({ username, email });

      setAccountId(user.accountID);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignUp = async (values: FormData) => {
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

  const onSubmitSignIn = async (values: z.infer<typeof formSchema>) => {};

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={
            type == "sign up"
              ? form.handleSubmit(onSubmitSignUp)
              : form.handleSubmit(onSubmitSignIn)
          }
          className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8 !important"
        >
          {type == "sign up" && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                    <FormLabel className="text-light-100 pt-2 body-2 w-full !important">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Username"
                        className="border-none shadow-none p-0 shad-no-focus placeholder:text-light-200 body-2 !important"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red body-2 ml-4 !important" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                  <FormLabel className="text-light-100 pt-2 body-2 w-full !important">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email Address"
                      className="border-none shadow-none p-0 shad-no-focus placeholder:text-light-200 body-2 !important"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red body-2 ml-4 !important" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-main button hover:bg-brand-100 transition-all rounded-full !important"
            disabled={isLoading}
          >
            {type == "sign up" ? "Create Account" : "Login"}
          </Button>

          {errorMsg && <p>*{errorMsg}</p>}

          <div className="center-flex">
            <Link
              href={type == "sign up" ? "sign-in" : "sign-up"}
              className="text-sm underline mt-2"
            >
              <p>
                {type == "sign up"
                  ? "Already have an account? Login"
                  : "Create an account"}
              </p>
            </Link>
          </div>

          <div className="center-flex gap-15">
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                loginWithOAuth(OAuthProvider.Google)
              }
              className="center hover:cursor-pointer"
            >
              <Image
                src={"/google_logo.png"}
                alt="Google Logo"
                width={28}
                height={28}
                style={{ objectFit: "contain" }}
              />
            </button>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                loginWithOAuth(OAuthProvider.Github)
              }
              className="center hover:cursor-pointer"
            >
              <Image
                src={"/github_logo.png"}
                alt="GitHub Logo"
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
              />
            </button>
          </div>
        </form>
      </Form>

      {true && (
        <OTPModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
