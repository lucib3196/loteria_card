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

  // const modules = import.meta.glob("/src/assets/loteria/individualCards/*png");
  // const individualCards: string[] = [];
  // for (const path in modules) {
  //   individualCards.push(path);
  // }

  // const mod2 = import.meta.glob("/loteria/individualCards/*jpg");
  // const LoteriaCards: string[] = [];
  // for (const path in mod2) {
  //   LoteriaCards.push(path);
  // }

  const individualCards = [
    "/loteria/individualCards/card1.png",
    "/loteria/individualCards/card2.png",
    "/loteria/individualCards/card3.png",
    "/loteria/individualCards/card5.png",
  ]

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
                backgroundImage: `url(/loteria/madre.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ) : (
            <div className="flex flex-col items-center h-full p-4 text-center rotate-y-180 font-thin ">
              <div className="flex flex-col justify-start border-2 border-r rounded-2xl w-full h-full py-3 gap-y-5">
                <div className="font-modack">
                  <p className="mt-2 text-2xl text-yellow-600">
                    She defines excelencia with
                  </p>
                </div>
                <div className=" text-sm md:text-base font-roboto text-black">
                  <ul className="list-disc list-inside space-y-4 text-left px-4">
                    <li>
                      <span className="text-red-500 font-semibold">Unwavering familismo:</span> motivating me to persist and seek help. She taught me that leaning on family during challenges in STEM isn’t a weakness but a source of strength and resilience.
                    </li>
                    <li>
                      <span className="text-red-500 font-semibold">Cultural wealth:</span> modeling hard work, routine, and perseverance. By maintaining a structured daily routine—juggling work, caregiving, and household tasks—she showed me the value of discipline and purpose in everything I do.
                    </li>
                    <li>
                      <span className="text-red-500 font-semibold">Resistance and agency:</span> demonstrating integrity, dedication, and resilience against barriers. Her example of overcoming early obstacles—waking up before dawn to work while still prioritizing family—reflects a powerful stance against systemic challenges.
                    </li>
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
