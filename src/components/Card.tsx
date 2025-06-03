"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { useAppState } from "../context";

const variants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
  reset: { x: 0, y: 0 },
};

type CardProps = {
  color: string;
  transformation?: string;
  style?: React.CSSProperties;
};

const MainCard: React.FC = () => {
  const [status, setStatus] = useState<"front" | "back" | "reset">("front");

  const modules = import.meta.glob("/public/loteria/individualCards/*png");
  const individualCards: string[] = [];
  for (const path in modules) {
    individualCards.push(path);
  }

  const mod2 = import.meta.glob("/public/loteria/*jpg");
  const LoteriaCards: string[] = [];
  for (const path in mod2) {
    LoteriaCards.push(path);
  }

  const CardStack = (num: number) => {
    return (
      <>
        {[...Array(num)].map((_, i) => (
          <div key={i}>
            <Card
              color="bg-gray-100 border-2"
              style={{
                transform: `rotate(${i * 10}deg) translateZ(${i * 5}px)`,
                backgroundImage: `url(${individualCards[i]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 py-8">
      <div className="relative w-full max-w-[400px] aspect-[2/3]">
        {CardStack(individualCards.length)}

        {/* Main interactive card */}
        <motion.div
          animate={status}
          variants={variants}
          drag
          dragConstraints={{ left: 0, right: 200, top: 0, bottom: 200 }}
          onClick={() =>
            setStatus((prev) => (prev === "front" ? "back" : "front"))
          }
          initial="hidden"
          whileInView="visible"
          className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gray-100 border border-gray-400 shadow-xl transform-3d preserve-3d z-50 overflow-hidden"
        >
          {status === "front" ? (
            <div
              className="flex flex-col items-center justify-center h-full p-4 text-center"
              style={{
                backgroundImage: `url(/public/loteria/madre.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ) : (
            <div className="flex flex-col items-center justify-evenly h-full p-4 text-center rotate-y-180">
              <div className="flex flex-col justify-start  border-2 border-r rounded-2xl w-full h-full py-3 gap-y-20  ">
                <div>
                  <h1 className="text-2xl items-start  font-semibold">
                    Journey Details
                  </h1>
                  <p className="mt-2 text-sm text-gray-600">
                    She defines excelencia with
                  </p>
                </div>
                <div>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// === Reusable Card Component ===
const Card: React.FC<CardProps> = ({ color, transformation, style }) => {
  const { state } = useAppState();

  return (
    <motion.div
      variants={variants}
      drag={state === "play"}
      dragConstraints={{ left: -500, right: 300, top: 0, bottom: 300 }}
      className={`absolute w-full h-full rounded-2xl ${color} shadow-lg transform-gpu ${transformation}`}
      style={style}
    />
  );
};

// === Optional: Stacked Loteria Background (can be re-used later) ===
// const LoteriaCard: React.FC<CardProps> = ({ color, transformation, style }) => {
//   return (
//     <motion.div
//       variants={variants}
//       className={`w-full h-full rounded-2xl ${color} shadow-lg mx-5 ${transformation}`}
//       style={style}
//     />
//   );
// };

export default MainCard;
