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
        //  className="btn btn-outline hover:bg-black border-0 hover:text-white text-black font-bold text-2xl uppercase"
        className={
          styles.button +
          " btn btn-outline text-black font-bold text-2xl uppercase"
        }
      >
        <span>Shrink Clipboard</span>
      </motion.button>
    </div>
  );
}
