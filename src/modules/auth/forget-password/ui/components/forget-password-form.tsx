"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdMail } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@template/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@template/components/ui/form";
import { InputWithIcon } from "@template/components/ui/input-with-icon";
import { authClient } from "@template/lib/auth-client";

import { ForgetPasswordSchema, ForgetPasswordSchemaType } from "../../schema";

const ForgetPasswordForm = () => {
  const router = useRouter();
  const auth = authClient;
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    async (data: ForgetPasswordSchemaType) => {
      setIsLoading(true);
      auth.forgetPassword(
        {
          email: data.email,
          redirectTo: "/auth/create-new-password",
        },
        {
          onSuccess: () => {
            toast.success("Check your email to reset your password");
            router.push("/auth/verify-email");
          },
          onError: () => {
            toast.error("Failed to sign up");
          },
          onSettled: () => {
            setIsLoading(false);
          },
        },
      );
    },
    [auth, router],
  );

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <InputWithIcon
                    {...field}
                    placeholder="Email"
                    IconLeading={IoMdMail}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;
