import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";

const mont = Montserrat({
  weight: "500",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div data-theme="black" className={mont.className}>
      <Component {...pageProps} />
    </div>
  );
}
