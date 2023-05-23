import { getShrinkURLBySlug } from "@/submodules/database/lib/ShrinkURL";
import { GetServerSidePropsContext } from "next";

type RedirectProps = {
  slug: string;
};

export default function redirect({ slug }: RedirectProps) {
  return <div>Failed to get redirect... for id {slug}</div>;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<any> {
  const slug = context.query.slug;
  try {
    const result = await getShrinkURLBySlug(slug as string);

    context.res.writeHead(301, { Location: result.url });
    context.res.end();
  } catch (err) {
    console.log(err);
  }
  // Does not matter what we return here. The user will be redirected.
  return { props: { slug } };
}
