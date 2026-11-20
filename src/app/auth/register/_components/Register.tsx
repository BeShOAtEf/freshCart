
"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { registerSchema ,registerSchemaForm } from './../../../../schema/register.schema';



export default function Register() {
  const form = useForm<registerSchemaForm>({
    resolver:zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

function onSubmit(data:registerSchemaForm){
    console.log(data)
}

  return (
    <form
     onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 w-2/3 mx-auto"
    >
      <h2 className="my-5 text-xl font-bold">
        Register Now
      </h2>

      {/* Name */}
      <Controller
        name="name"
        control={form.control}
       
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">
              Name
            </FieldLabel>

            <Input
              {...field}
              id="name"
              placeholder="Enter your name"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={form.control}
       
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">
              Email
            </FieldLabel>

            <Input
              {...field}
              id="email"
              type="email"
              placeholder="Enter your email"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Phone */}
      <Controller
        name="phone"
        control={form.control}
       
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone">
              Phone Number
            </FieldLabel>

            <Input
              {...field}
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              aria-invalid={fieldState.invalid}
              autoComplete="tel"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={form.control}
       
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">
              Password
            </FieldLabel>

            <Input
              {...field}
              id="password"
              type="password"
              placeholder="Enter your password"
              aria-invalid={fieldState.invalid}
              autoComplete="new-password"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Repassword */}
      <Controller
        name="rePassword"
        control={form.control}
       
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="repassword">
              Confirm Password
            </FieldLabel>

            <Input
              {...field}
              id="repassword"
              type="password"
              placeholder="Confirm your password"
              aria-invalid={fieldState.invalid}
              autoComplete="new-password"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button type="submit" className="bg-main text-white my-5 ml-auto block cursor-pointer hover:bg-main">
        Register
      </Button>
    </form>
  );
}