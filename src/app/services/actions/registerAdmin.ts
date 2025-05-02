"use client";
import { authKey } from "@/app/constants/authkey";
import { getFromLocalStorage } from "@/app/utils/local-storage";

 // Client-only context



export const registerAdmin = async (formData: FormData) => {
  const token = getFromLocalStorage(authKey); // Ensure token is retrieved client-side
  
  if (!token) {
    throw new Error("Token not found");
  }

  const res = await fetch(
    `https://itbd-backend.vercel.app/api/v1/user/create-admin`,
    {
      method: "POST",
      headers: {
        Authorization: `${token}`, // Use Bearer format for security standards
      },
      body: formData,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to register admin: ${res.statusText}`);
  }

  const adminInfo = await res.json();
  return adminInfo;
};
