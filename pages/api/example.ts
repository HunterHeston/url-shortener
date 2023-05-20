// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// initialize a prisma client
import {
  PrismaClient,
  User,
} from "../../submodules/database/node_modules/@prisma/client";
const prisma = new PrismaClient();

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: "Hello World" });
}
