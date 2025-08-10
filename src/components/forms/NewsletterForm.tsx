"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Newsletter form now uses direct API route calls
import { useToast } from "../../contexts/ToastContext";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type NewsletterFormData = z.infer<typeof schema>;

const NewsletterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(schema),
  });
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Subscription failed");
      }

      showToast("Subscribed successfully!", "success");
      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Subscription failed. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="px-4 py-2 rounded-md bg-gray-800 text-white w-64 focus:outline-none"
          aria-label="Email address"
          aria-required="true"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        disabled={isSubmitting}
        aria-label="Subscribe to newsletter"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
};

export default NewsletterForm;
