"use client";

import { motion } from "framer-motion";

const ExampleComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-orange-400 border shadow rounded-lg p-6 flex flex-col items-center justify-center h-72 cursor-pointer"
    >
      <h2 className="font-bold text-lg text-gray-900">Announcements</h2>
      <p>Stay updated with the latest news.</p>
    </motion.div>
  );
};

export default ExampleComponent;
