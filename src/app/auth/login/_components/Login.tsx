
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

import { loginSchema, loginSchemaForm } from "@/schema/login.schema";
import {signIn } from 'next-auth/react'



export default function Login() {
  const form = useForm<loginSchemaForm>({
    resolver:zodResolver(loginSchema),
    defaultValues: {
     
      email: "",
      password: "",
     
    },
  });



async function onSubmit(data:loginSchemaForm){
    const res = await signIn('credentials',{
        email:data.email,
        password:data.password,
        redirect:false,
        callbackUrl:'/'
      })
      console.log(res)
      if (res?.ok && res.url) {
  window.location.assign(res.url);
} else {
  console.log(res?.error);
}
}

function handleGitHupSignIn(){
  signIn('github' , {
    callbackUrl:'/'
  })
}

  return (
    <>
    <form
     onSubmit={form.handleSubmit(onSubmit)}
     className="space-y-5 w-2/3 mx-auto"
     >
      <h2 className="my-5 text-xl font-bold">
        Login Now
      </h2>

 

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

    

      <Button type="submit" className="bg-main text-white my-5 ml-auto block cursor-pointer hover:bg-main">
        Login
      </Button>
    </form>
    <div className="text-center">
        <Button onClick={handleGitHupSignIn}>Login With GITHUP <i className="fa-brands fa-github"></i></Button>
    </div>
        </>

  );
}