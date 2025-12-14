"use client";

import { motion } from "framer-motion";

interface RevealAnimationProps {
  title: string;
  content: string;
}

export default function RevealAnimation({
  title,
  content,
}: RevealAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="space-y-6"
    >
      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl font-bold text-center text-gray-800"
      >
        {title}
      </motion.h1>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="h-0.5 bg-gray-300 origin-left"
      />

      {/* Content */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap"
      >
        {content}
      </motion.p>
    </motion.div>
  );
}
