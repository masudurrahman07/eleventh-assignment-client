import React from "react";
import { ChefHat, HandHeart, Truck } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const ExtraSection = () => {
  const { theme } = useTheme();

  return (
    <section
      className="py-20 transition-colors duration-300"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(to bottom, #065f46, #111827)' 
          : 'linear-gradient(to bottom, #ecfdf5, #ffffff)'
      }}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{ color: theme === 'dark' ? '#10b981' : '#047857' }}>
          Why Choose LocalChefBazaar?
        </h2>

        <p
          className="text-lg md:text-xl mt-4 mb-12 max-w-2xl mx-auto"
          style={{ color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
          We connect you with skilled home chefs to bring delicious, healthy, and
          freshly made meals right to your door.
        </p>

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
            <div
              key={i}
              className="group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : 'rgba(255, 255, 255, 0.7)',
                borderColor: theme === 'dark' ? '#374151' : 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(12px)'
              }}>
              <div className="flex justify-center mb-4">{card.icon}</div>

              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
                {card.title}
              </h3>

              <p 
                className="text-sm md:text-base leading-relaxed"
                style={{ color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
                {card.desc}
              </p>

              <div className="h-1 bg-green-500 w-0 group-hover:w-full transition-all duration-300 mt-4 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;