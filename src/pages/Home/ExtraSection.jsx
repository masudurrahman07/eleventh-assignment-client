// src/pages/Home/ExtraSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { ChefHat, HandHeart, Truck } from "lucide-react"; // Optional icons

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const ExtraSection = () => {
  return (
    <motion.section
      className="py-20 bg-linear-to-b from-green-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeUp}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-green-700 tracking-tight"
          variants={fadeUp}
        >
          Why Choose LocalChefBazaar?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-600 text-lg md:text-xl mt-4 mb-12 max-w-2xl mx-auto"
          variants={fadeUp}
        >
          We connect you with skilled home chefs to bring delicious, healthy, and
          freshly made meals right to your door.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

          {[
            {
              title: "Fresh Meals",
              desc: "Meals are prepared fresh every day using ingredients you can trust.",
              icon: <ChefHat size={40} className="text-green-600" />,
            },
            {
              title: "Affordable Prices",
              desc: "Homemade quality, restaurant taste — without the heavy price tag.",
              icon: <HandHeart size={40} className="text-green-600" />,
            },
            {
              title: "Fast Delivery",
              desc: "Quick and reliable delivery right to your home or workplace.",
              icon: <Truck size={40} className="text-green-600" />,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="
                group p-8 rounded-2xl shadow-lg 
                bg-white/70 backdrop-blur-md border border-white/40
                hover:shadow-2xl transition-all duration-300 
                hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                {card.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {card.title}
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {card.desc}
              </p>

              {/* Hover underline effect */}
              <div className="h-1 bg-green-500 w-0 group-hover:w-full transition-all duration-300 mt-4 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ExtraSection;
