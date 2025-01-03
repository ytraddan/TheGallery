"use client";

import { motion } from "framer-motion";

export default function BackgroundLights() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="relative h-full w-full overflow-hidden bg-background">
        {/* Top Center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-1/2 hidden h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] 2xl:block"
        />

        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0.5, x: -100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute -left-[10%] -top-[20%] hidden h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[100px] 2xl:block"
        />

        {/* Top Right */}
        <motion.div
          initial={{ opacity: 0.5, x: 100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="absolute -right-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-[100px]"
        />

        {/* Bottom Left */}
        <motion.div
          initial={{ opacity: 0.5, x: -100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="absolute -bottom-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-pink-500/10 blur-[100px]"
        />

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0.5, x: 100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="absolute -bottom-[20%] -right-[10%] hidden h-[600px] w-[600px] rounded-full bg-rose-500/10 blur-[100px] 2xl:block"
        />
      </div>
    </div>
  );
}
