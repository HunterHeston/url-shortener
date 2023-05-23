import { motion } from "framer-motion";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

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
  const [xMax, setXMax] = useState(0);
  const [yMax, setYMax] = useState(0);

  useEffect(() => {
    setXMax(window.innerWidth);
    setYMax(window.innerHeight);
  }, []);

  return (
    <div>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
          <div className={styles.highlightText}>{url}</div>
          {NStars(xMax, yMax, 350)}
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

function NStars(xMax: number, yMax: number, numberOfStars: number) {
  const stars = [];

  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<Star key={i} xMax={xMax} yMax={yMax} />);
  }
  return stars;
}

type StarProps = {
  xMax: number;
  yMax: number;
};

function Star({ xMax, yMax }: StarProps) {
  const xDirection = Math.random() > 0.5 ? 1 : -1;
  const yDirection = Math.random() > 0.5 ? 1 : -1;
  const size = Math.random() * 3 + 1;

  const startX = (Math.random() * xMax - xMax / 2) * xDirection;
  const startY = (Math.random() * yMax - yMax / 2) * yDirection;

  const endX = Math.random() * xMax * (xDirection * -1);
  const endY = Math.random() * yMax * (yDirection * -1);

  console.log(startX, startY, endX, endY);

  return (
    <motion.div
      initial={{ x: startX, y: startY }}
      animate={{ x: endX, y: endY }}
      transition={{ duration: 100, type: "linear", repeat: Infinity }}
      className="bg-white rounded-full absolute"
      style={{ width: size, height: size, backgroundColor: RandomColor() }}
    ></motion.div>
  );
}

function RandomColor() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
}
