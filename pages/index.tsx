import { motion } from "framer-motion";
import styles from "./index.module.css";
import { useState } from "react";

export default function Shrink() {
  const [shortURL, setShortURL] = useState("");
  return (
    <div
      className={
        styles.bg +
        " flex flex-col items-center justify-center min-h-screen py-2"
      }
    >
      <motion.button
        className={
          styles.button +
          " btn btn-outline text-black font-bold text-2xl uppercase"
        }
        onClick={async () => {
          const clipboardContents = await getContentsOfClipBoard();
          console.log(clipboardContents);
          if (isValidWebAddress(clipboardContents)) {
            const result = await fetch(`/api/new?url=${clipboardContents}`, {
              method: "POST",
            });
            const data = await result.json();
            console.log(data);
            if (result.status === 200) {
              const url = `http://${location.host}/${data.slug}`;
              navigator.clipboard.writeText(url);
              setShortURL(url);
            }
          }
        }}
      >
        <span>Shrink Clipboard</span>
      </motion.button>
      <UrlView open={shortURL !== ""} url={shortURL} />
    </div>
  );
}

type UrlViewProps = {
  open: boolean;
  url: string;
};
export function UrlView({ open, url }: UrlViewProps) {
  return (
    <div>
      {open && (
        <motion.div
          initial={{ scale: 0, borderRadius: "100%" }}
          animate={{ scale: 1, borderRadius: "0%" }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center text-white text-2xl"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 1)",
            zIndex: 9999,
          }}
        >
          <div>{url}</div>
        </motion.div>
      )}
    </div>
  );
}

// function gets what ever string is currently in the clipboard
async function getContentsOfClipBoard(): Promise<string> {
  return await navigator.clipboard.readText();
}

function isValidWebAddress(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
