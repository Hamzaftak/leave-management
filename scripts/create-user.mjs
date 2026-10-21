import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const name = "Company Administrator";
  const email = "admin@company.com";
  const password = "ChangeThisPassword123!";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("This email already exists.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      // Uses EMPLOYEE, your schema's default role.
    },
  });

  console.log("User created successfully:", user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
