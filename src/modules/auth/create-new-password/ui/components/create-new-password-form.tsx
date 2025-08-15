"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
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
import { InputPassword } from "@template/components/ui/input-password";
import { authClient } from "@template/lib/auth-client";

import {
  CreateNewPasswordSchema,
  CreateNewPasswordSchemaType,
} from "../../schema";

const CreateNewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const auth = authClient;
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CreateNewPasswordSchemaType>({
    resolver: zodResolver(CreateNewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: searchParams.get("token") ?? "",
    },
  });

  const onSubmit = useCallback(
    async (data: CreateNewPasswordSchemaType) => {
      setIsLoading(true);
      auth.resetPassword(
        {
          newPassword: data.password,
          token: form.getValues("token"),
        },
        {
          onSuccess: () => {
            toast.success("Password changed successfully");
            router.push("/auth/sign-in");
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
    [auth, router, form],
  );

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Password</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Confirm Password</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    placeholder="Confirm Password"
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
            {isLoading ? "Loading..." : "Change Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewPasswordForm;
