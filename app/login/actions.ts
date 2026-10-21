"use server";

import { prisma } from "../lib/prisma";
import { createSession, deleteSession } from "../lib/auth";
import { compare } from "bcryptjs";
import { redirect } from "next/navigation";

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await compare(password, user.passwordHash))) {
    redirect("/login?error=invalid");
  }

  await createSession(user.id);

  redirect("/dashboard");
}
