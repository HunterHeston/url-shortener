// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// initialize a prisma client
import { newShrinkURL } from "@/submodules/database/lib/ShrinkURL";
import { isValidWebAddress } from "@/lib/urlValidation";

type Data = {
  slug?: string;
  url?: string;
  errorMessage?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // get url from query
  let { url } = req.query;

  if (!isValidWebAddress(url as string)) {
    return res.status(400).json({ errorMessage: "Invalid URL" });
  }

  // prepend http:// if not included
  url = prependHttp(url as string);

  // create new database row
  const slug = generateRandomSlug(5);
  const result = await newShrinkURL({
    slug,
    url: url as string,
  });

  // some failure occurred while creating database entries.
  if (result instanceof Error) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }

  // success send back slug and url
  res.status(200).json({
    url: result.url,
    slug: result.slug,
  });
}

function prependHttp(url: string) {
  if (!url.includes("http://") && !url.includes("https://")) {
    url = "http://" + url;
  }
  return url;
}

// generates a random string of length n
function generateRandomSlug(n: number) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < n; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
