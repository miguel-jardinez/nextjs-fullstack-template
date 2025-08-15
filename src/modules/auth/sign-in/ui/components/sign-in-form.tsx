"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdMail } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { InputPassword } from "@template/components/ui/input-password";
import { InputWithIcon } from "@template/components/ui/input-with-icon";
import { SocialButton } from "@template/components/ui/social-button";
import { authClient } from "@template/lib/auth-client";

import { SignInSchema, SignInSchemaType } from "../../schema";

const SignInForm = () => {
  const router = useRouter();
  const auth = authClient;
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: SignInSchemaType) => {
      setIsLoading(true);
      auth.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            router.push("/");
          },
          onError: () => {
            setIsLoading(false);
            toast.error("Failed to sign in");
          },
        },
      );
    },
    [auth.signIn, router, setIsLoading],
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

          <p className="text-xs text-muted-foreground text-end">
            Forgot your password?{" "}
            <Link
              href="/auth/forget-password"
              className="text-primary/80 underline font-semibold"
            >
              Click here
            </Link>
          </p>

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

      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Social Buttons */}
      <SocialButton
        provider="google"
        className="w-full"
        onClick={() => {
          // TODO: Implement Google sign up
          console.log("google");
        }}
      />
    </div>
  );
};

export default SignInForm;
