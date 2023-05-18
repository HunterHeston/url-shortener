// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// initialize a prisma client
import {
  PrismaClient,
  User,
} from "../../submodules/database/node_modules/@prisma/client";
const prisma = new PrismaClient();

type Data = {
  users: User[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = await prisma.user.findMany();

  console.log(users);

  res.status(200).json({ users });
}
