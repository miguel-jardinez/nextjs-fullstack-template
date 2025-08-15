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
import { Input } from "@template/components/ui/input";
import { InputPassword } from "@template/components/ui/input-password";
import { InputWithIcon } from "@template/components/ui/input-with-icon";
import { SocialButton } from "@template/components/ui/social-button";
import { authClient } from "@template/lib/auth-client";
import {
  SignUpSchema,
  SignUpSchemaType,
} from "@template/modules/auth/sign-up/schema";

const SignupForm = () => {
  const router = useRouter();
  const auth = authClient;
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = useCallback(
    async (data: SignUpSchemaType) => {
      auth.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: `${data.name} ${data.lastName}`,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            setIsLoading(false);
            toast.success("Check your email to confirm your account");
            router.push("/auth/verify-email");
          },
          onError: () => {
            setIsLoading(false);
            toast.error("Failed to sign up");
          },
        },
      );
    },
    [auth.signUp, router],
  );

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Last Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <p className="text-xs text-muted-foreground text-end">
            Do you already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-primary/80 underline font-semibold"
            >
              Sign in
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

export default SignupForm;
