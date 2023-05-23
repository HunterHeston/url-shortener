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
    const result = await fetch(
      `${context.req.headers.host}/api/get?slug=${slug}`
    );
    const data = await result.json();

    if (result.status === 200) {
      context.res.writeHead(301, { Location: data.url });
      context.res.end();
    } else {
    }
  } catch (err) {
    console.log(err);
  }
  // Does not matter what we return here. The user will be redirected.
  return { props: { slug } };
}
