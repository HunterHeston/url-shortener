import { motion } from "framer-motion";
import styles from "./index.module.css";

export default function Shrink() {
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
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await result.json();
            console.log(data);
            if (result.status === 200) {
              console.log(`${location.host}/${data.slug}`);
              navigator.clipboard.writeText(`${location.host}/${data.slug}`);
            }
          }
        }}
      >
        <span>Shrink Clipboard</span>
      </motion.button>
    </div>
  );
}

// function gets what ever string is currently in the clipboard
async function getContentsOfClipBoard(): Promise<string> {
  return await navigator.clipboard.readText();
}

async function isValidWebAddress(url: string): Promise<boolean> {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
