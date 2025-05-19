import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const OTPModal = ({
  email,
  accountId,
}: {
  email: string;
  accountId: string | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //API to verify
    } catch (e) {
      console.log("Failed to verify OTP", e);
    }
  };

  const handleResend = async () => {};

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent className="space-y-4 max-w-[95%] sm:w-fit rounded-xl md:rounded-[30px] px-4 md:px-8 py-10 bg-white outline-none !important;">
        <AlertDialogHeader className="center">
          <AlertDialogTitle>
            OTP Verification{" "}
            <X
              onClick={() => setIsOpen(false)}
              className="absolute -right-1 -top-0 cursor-pointer sm:right-3 sm:top-2"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter OTP Verification Code sent to {email}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <AlertDialogFooter className="center">
          <AlertDialogAction
            onClick={handleSubmit}
            type="button"
            disabled={isLoading}
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
        <div>
          Didn't recive code?
          <Button variant="link" onClick={handleResend}>
            Resend Code
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
