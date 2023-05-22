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
): Promise<{ props: RedirectProps }> {
  const slug = context.query.slug;
  try {
    const res = await fetch(`http://localhost/api/get?slug=${slug}`);
    const data = await res.json();
    console.log(data);
    return {
      props: {
        url: data.url,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        url: "",
      },
    };
  }
}
