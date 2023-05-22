import { GetServerSideProps, GetServerSidePropsContext } from "next";

type RedirectProps = {
  url: string;
};

export default function redirect({ url }: RedirectProps) {
  console.log(url);
  return <div>loading... to {url}</div>;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<any> {
  const slug = context.query.slug;
  try {
    const result = await (
      await fetch(`http://localhost/api/get?slug=${slug}`)
    ).json();

    context.res.writeHead(301, { Location: result.url });
    context.res.end();
  } catch (err) {
    console.log(err);
    context.res.writeHead(301, { Location: "/" });
    context.res.end();
  }
}
