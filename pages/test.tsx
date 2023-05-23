import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Test() {
  const [xMax, setXMax] = useState(0);
  const [yMax, setYMax] = useState(0);

  useEffect(() => {
    setXMax(window.innerWidth);
    setYMax(window.innerHeight);
  }, []);

  console.log(xMax, yMax);

  if (xMax === 0 || yMax === 0) {
    return <div></div>;
  }

  return (
    <motion.div className="h-screen w-screen bg-black overflow-hidden">
      {NStars(xMax, yMax, 150)}
    </motion.div>
  );
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
  const startX = Math.random() * xMax;
  const startY = Math.random() * yMax;

  const endX = Math.random() * xMax;
  const endY = Math.random() * yMax;

  console.log(startX, startY, endX, endY);

  return (
    <motion.div
      initial={{ x: startX, y: startY }}
      animate={{ x: endX, y: endY }}
      transition={{ duration: 100, type: "linear" }}
      className="h-1 w-1 bg-white rounded-lg absolute"
    ></motion.div>
  );
}
