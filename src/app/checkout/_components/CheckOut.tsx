"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button"; 
import { addressSchema, addressSchemaForm } from "@/schema/address.schema";
import { useSession } from "next-auth/react"; // 1. استيراد useSession
import { toast } from "react-toastify";
import { useState } from "react";
import { checkoutOnline } from "../_action/checkout.action";

export default function CheckOut({ cartId }: { cartId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession(); // 2. جلب الـ session الحالية

  const form = useForm<addressSchemaForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      details: "",
      city: "",
      phone: "",
    },
  });

  async function onSubmit(data: addressSchemaForm) {
    try {
      setIsLoading(true);

      // 3. استخراج التوكن من الـ session (حسب هيكل بيانات الـ session لديك)
      const userToken = session?.user?.token || (session as any)?.token || "";

      if (!userToken) {
        toast.error("Please login first to proceed with payment!");
        setIsLoading(false);
        return;
      }

      // 4. تمرير الـ token للـ Server Action
      const response = await checkoutOnline(cartId, data, userToken);
      
      if (response.status === "success") {
        toast.success("Redirecting to payment gateway...");
        window.location.href = response.session.url;
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to process payment");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-2/3 mx-auto py-10">
      <h2 className="my-5 text-2xl font-bold">
        Shipping Address Checkout
      </h2>

      {/* حقل الـ Details */}
      <Controller
        name="details"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="details">Details</FieldLabel>
            <Input
              {...field}
              id="details"
              placeholder="Enter your street details"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* حقل الـ City */}
      <Controller
        name="city"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input
              {...field}
              id="city"
              placeholder="Enter your city"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* حقل الـ Phone */}
      <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              {...field}
              id="phone"
              placeholder="Enter your phone number"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={isLoading} className="w-full cursor-pointer">
        {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : "Pay Now"}
      </Button>
    </form>
  );
}