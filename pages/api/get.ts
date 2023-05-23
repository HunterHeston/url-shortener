import { getShrinkURLBySlug } from "@/submodules/database/lib/ShrinkURL";
import { ErrorStatus } from "@/submodules/database/types/ErrorStatus";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get slug from query
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ errorMessage: "Invalid slug: not provided" });
  }

  if (slug === "") {
    return res
      .status(400)
      .json({ errorMessage: "Invalid slug: must be more than 0 chars long." });
  }

  const result = await getShrinkURLBySlug(slug as string);

  // happy case
  if (result.status === ErrorStatus.OK) {
    return res.status(200).json({ url: result.url });
  }

  // user provided slug that doesn't exist
  if (result.status === ErrorStatus.NOT_FOUND) {
    return res.status(404).json({ errorMessage: "Not Found" });
  }

  // internal server error looking up slug
  if (result.status === ErrorStatus.INTERNAL) {
    console.error(
      `Error getting url from database for slug: "${slug}": ${result.error?.message}`
    );
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
}
