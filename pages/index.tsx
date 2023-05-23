import { motion } from "framer-motion";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

////////////////////////////////////////////////////////////////
// Main component
////////////////////////////////////////////////////////////////
export default function Shrink() {
  const [shortURL, setShortURL] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [buttonText, setButtonText] = useState("Shrink Clipboard");
  const [inputText, setInputText] = useState("");

  const shrinkURL = async () => {
    const clipboardContents = await getContentsOfClipBoard();
    let url = "";

    if (isValidWebAddress(clipboardContents)) {
      url = clipboardContents;
    } else if (isValidWebAddress(inputText)) {
      url = inputText;
    } else {
      // Whatever is in the clipboard is not a valid url
      // Let the user input a url manually
      setShowInput(true);
      setButtonText("Shrink");
      return;
    }

    const result = await fetch(`/api/new?url=${url}`, {
      method: "POST",
    });
    const data = await result.json();
    console.log(data);
    if (result.status === 200) {
      const url = `http://${location.host}/${data.slug}`;
      navigator.clipboard.writeText(url);
      setShortURL(url);
    }
  };

  return (
    <div
      className={
        styles.bg +
        " flex flex-col items-center justify-center min-h-screen py-2"
      }
    >
      <div className="flex">
        {showInput && (
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a URL"
            type="text"
            className="input input-bordered max-w-xs"
          />
        )}
        <motion.button
          className={
            styles.button +
            " btn btn-outline text-black font-bold text-2xl uppercase"
          }
          onClick={shrinkURL}
        >
          <span>{buttonText}</span>
        </motion.button>
      </div>
      <UrlView open={shortURL !== ""} url={shortURL} />
    </div>
  );
}

////////////////////////////////////////////////////////////////
// Other Components
////////////////////////////////////////////////////////////////
type UrlViewProps = {
  open: boolean;
  url: string;
};

// This view takes over the screen when a url is successfully shortened
// It displays the shortened url and a bunch of stars that move around
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
            zIndex: 1,
          }}
        >
          <div className={styles.highlightText}>{url}</div>
          {NStars(xMax, yMax, 350)}
        </motion.div>
      )}
    </div>
  );
}

type StarProps = {
  xMax: number;
  yMax: number;
};

// Star is a small circle that moves from a random point to another random point
function Star({ xMax, yMax }: StarProps) {
  // Randomly pick a direction for the star to move in x and y
  const xDirection = Math.random() > 0.5 ? 1 : -1;
  const yDirection = Math.random() > 0.5 ? 1 : -1;

  // Create a few big stars that move in front of the text
  let size = Math.random() * 3 + 1;
  let zIndex = -1;
  if (Math.random() > 0.99) {
    size = 10;
    zIndex = 2;
  }

  // where the star starts
  const startX = (Math.random() * xMax - xMax / 2) * xDirection;
  const startY = (Math.random() * yMax - yMax / 2) * yDirection;

  // where the star ends
  const endX = Math.random() * xMax * (xDirection * -1);
  const endY = Math.random() * yMax * (yDirection * -1);

  // Move from point A, to point B, to point A, to point B... infinitely
  return (
    <motion.div
      initial={{ x: startX, y: startY }}
      animate={{ x: endX, y: endY }}
      transition={{
        duration: 100,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
      className="bg-white rounded-full absolute"
      style={{
        width: size,
        height: size,
        backgroundColor: RandomColor(),
        zIndex: zIndex,
      }}
    ></motion.div>
  );
}

////////////////////////////////////////////////////////////////
// Helper functions
////////////////////////////////////////////////////////////////

// Returns an array of stars of length numberOfStars
// The array of jsx stars are then rendered in the calling component
function NStars(xMax: number, yMax: number, numberOfStars: number) {
  const stars = [];

  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<Star key={i} xMax={xMax} yMax={yMax} />);
  }
  return stars;
}

// Returns a random color for the star
function RandomColor() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
}

// function gets what ever string is currently in the clipboard
// returns an empty string if the clipboard is empty or failure
async function getContentsOfClipBoard(): Promise<string> {
  // not available on IOS browsers if served over HTTP.
  // must be served over HTTPS on IOS
  if (!navigator.clipboard) {
    return "";
  }

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
