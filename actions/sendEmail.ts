"use server";

import { validateString, getErrorMessage } from "@/lib/utils";

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  try {
    await fetch(process.env.HOST + "/api/Mail", {
      body: JSON.stringify({
        email: senderEmail,
        message
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {}
};
