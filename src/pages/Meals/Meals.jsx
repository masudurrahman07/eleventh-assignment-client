
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { Search, Filter, Clock, Star, X } from "lucide-react";
import MealCard from "../../components/MealCard";
import MealCardSkeleton from "../../components/MealCardSkeleton";
import Loading from "../../components/Loading";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Meals = () => {
  const { theme } = useTheme();
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  
  const limit = 12; // Changed to 12 for better 4-column layout

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://local-chef-bazaar-server-mocha.vercel.app/meals?page=${page}&limit=${limit}`
        );

        let fetchedMeals = res.data.meals || [];
        fetchedMeals.sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );

        setMeals(fetchedMeals);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setMeals([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [page, sortOrder]);


  useEffect(() => {
    let filtered = [...meals];


    if (searchTerm) {
      filtered = filtered.filter(
        (meal) =>
          meal.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meal.chefName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meal.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }


    if (deliveryTimeFilter) {
      filtered = filtered.filter((meal) => {
        const deliveryTime = meal.estimatedDeliveryTime.toLowerCase();
        const filterValue = deliveryTimeFilter.toLowerCase();
        
     
        const timeMatch = deliveryTime.match(/(\d+)/);
        const filterMatch = filterValue.match(/(\d+)/);
        
        if (timeMatch && filterMatch) {
          const mealTime = parseInt(timeMatch[1]);
          const filterTime = parseInt(filterMatch[1]);
          
         
          switch (deliveryTimeFilter) {
            case "quick": 
              return mealTime <= 30;
            case "medium": 
              return mealTime > 30 && mealTime <= 60;
            case "slow": 
              return mealTime > 60;
            default:
              return deliveryTime.includes(filterValue);
          }
        }
        
        return deliveryTime.includes(filterValue);
      });
    }

 
    if (minRating || maxRating) {
      filtered = filtered.filter((meal) => {
        const rating = parseFloat(meal.rating);
        const min = minRating ? parseFloat(minRating) : 0;
        const max = maxRating ? parseFloat(maxRating) : 5;
        return rating >= min && rating <= max;
      });
    }

    setFilteredMeals(filtered);
  }, [meals, searchTerm, deliveryTimeFilter, minRating, maxRating]);

  const clearFilters = () => {
    setSearchTerm("");
    setDeliveryTimeFilter("");
    setMinRating("");
    setMaxRating("");
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm || deliveryTimeFilter || minRating || maxRating;


  if (loading) {
    return (
      <div 
        className="px-4 py-12 max-w-7xl mx-auto min-h-screen transition-colors duration-300"
        style={{
          backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'
        }}>
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
          Explore All Meals
        </motion.h1>

    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }, (_, i) => (
            <MealCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }


  const displayMeals = hasActiveFilters ? filteredMeals : meals;
  const totalPages = Math.ceil(total / limit);

  if (!displayMeals.length && !loading) {
    return (
      <div 
        className="px-4 py-12 max-w-7xl mx-auto min-h-screen transition-colors duration-300"
        style={{
          backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'
        }}>
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
          Explore All Meals
        </motion.h1>
        
        <p 
          className="text-center text-lg mt-16"
          style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
          {hasActiveFilters ? 'No meals match your search criteria.' : 'No meals available.'}
        </p>
        
        {hasActiveFilters && (
          <div className="text-center mt-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="px-4 py-12 max-w-7xl mx-auto min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'
      }}>

      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
        Explore All Meals
      </motion.h1>

   
      <motion.div
        className="mb-8 space-y-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}>
    
        <div className="relative max-w-md mx-auto">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}/>
          <input
            type="text"
            placeholder="Search meals, chefs, or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
            style={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
              color: theme === 'dark' ? '#f9fafb' : '#1f2937'
            }}/>
        </div>

  
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
       
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium transition-all duration-300"
            style={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              borderColor: theme === 'dark' ? '#374151' : '#d1d5db',
              color: theme === 'dark' ? '#f9fafb' : '#374151'
            }}>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>


          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-all duration-300 ${
              hasActiveFilters ? 'ring-2 ring-emerald-500' : ''
            }`}
            style={{
              backgroundColor: showFilters 
                ? '#10b981' 
                : theme === 'dark' ? '#1f2937' : '#ffffff',
              borderColor: theme === 'dark' ? '#374151' : '#d1d5db',
              color: showFilters 
                ? '#ffffff' 
                : theme === 'dark' ? '#f9fafb' : '#374151'
            }}>
            <Filter className="w-4 h-4" />
            Filters {hasActiveFilters && `(${[searchTerm, deliveryTimeFilter, minRating || maxRating].filter(Boolean).length})`}
          </button>


          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>


        <motion.div
          initial={false}
          animate={showFilters ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto",
              scale: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98],
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            },
            closed: {
              opacity: 0,
              height: 0,
              scale: 0.95,
              y: -10,
              transition: {
                duration: 0.3,
                ease: [0.04, 0.62, 0.23, 0.98],
                staggerChildren: 0.05,
                staggerDirection: -1
              }
            }
          }}
          style={{ overflow: "hidden" }}>
          {showFilters && (
            <motion.div
              className="border rounded-xl p-6 shadow-lg mt-4"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
              }}
              variants={{
                open: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, ease: "easeOut" }
                },
                closed: {
                  opacity: 0,
                  y: -20,
                  transition: { duration: 0.2, ease: "easeIn" }
                }
              }}>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}>
            
                <motion.div
                  variants={{
                    open: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3, ease: "easeOut" }
                    },
                    closed: {
                      opacity: 0,
                      x: -20,
                      transition: { duration: 0.2, ease: "easeIn" }
                    }
                  }}>
                  <label 
                    className="flex items-center gap-2 text-sm font-semibold mb-3"
                    style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                    <Clock className="w-4 h-4" />
                    Delivery Time
                  </label>
                  <div className="space-y-2">
                  
                    <motion.div 
                      className="grid grid-cols-3 gap-2 mb-3"
                      variants={{
                        open: {
                          transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                        },
                        closed: {
                          transition: { staggerChildren: 0.02, staggerDirection: -1 }
                        }
                      }}>
                      {[
                        { key: "quick", label: "Quick", time: "≤30 min" },
                        { key: "medium", label: "Medium", time: "30-60 min" },
                        { key: "slow", label: "Relaxed", time: ">60 min" }
                      ].map((option, index) => (
                        <motion.button
                          key={option.key}
                          onClick={() => setDeliveryTimeFilter(deliveryTimeFilter === option.key ? "" : option.key)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                            deliveryTimeFilter === option.key 
                              ? 'bg-emerald-500 text-white border-emerald-500' 
                              : 'border-gray-300 hover:border-emerald-300'
                          }`}
                          style={{
                            backgroundColor: deliveryTimeFilter === option.key 
                              ? '#10b981' 
                              : theme === 'dark' ? '#374151' : '#ffffff',
                            borderColor: deliveryTimeFilter === option.key 
                              ? '#10b981' 
                              : theme === 'dark' ? '#4b5563' : '#d1d5db',
                            color: deliveryTimeFilter === option.key 
                              ? '#ffffff' 
                              : theme === 'dark' ? '#f9fafb' : '#374151'
                          }}
                          variants={{
                            open: {
                              opacity: 1,
                              scale: 1,
                              y: 0,
                              transition: { 
                                duration: 0.3, 
                                ease: "easeOut",
                                delay: index * 0.05
                              }
                            },
                            closed: {
                              opacity: 0,
                              scale: 0.8,
                              y: 10,
                              transition: { 
                                duration: 0.2, 
                                ease: "easeIn"
                              }
                            }
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ 
                            scale: 0.95,
                            transition: { duration: 0.1 }
                          }}>
                          <div className="flex flex-col items-center">
                            <Clock className="w-3 h-3 mb-1" />
                            <span>{option.label}</span>
                            <span className="text-xs opacity-75">{option.time}</span>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                
                    <motion.div
                      variants={{
                        open: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.3, ease: "easeOut", delay: 0.2 }
                        },
                        closed: {
                          opacity: 0,
                          y: 10,
                          transition: { duration: 0.2, ease: "easeIn" }
                        }
                      }}>
                      <label 
                        className="text-xs font-medium mb-1 block"
                        style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        Or search specific time:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 45 minutes, 1 hour"
                        value={deliveryTimeFilter && !["quick", "medium", "slow"].includes(deliveryTimeFilter) ? deliveryTimeFilter : ""}
                        onChange={(e) => setDeliveryTimeFilter(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all duration-200"
                        style={{
                          backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                          borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                          color: theme === 'dark' ? '#f9fafb' : '#1f2937'
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

         
                <motion.div
                  variants={{
                    open: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3, ease: "easeOut", delay: 0.1 }
                    },
                    closed: {
                      opacity: 0,
                      x: 20,
                      transition: { duration: 0.2, ease: "easeIn" }
                    }
                  }}>
                  <label 
                    className="flex items-center gap-2 text-sm font-semibold mb-3"
                    style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151' }}>
                    <Star className="w-4 h-4" />
                    Rating Range
                  </label>
                  <div className="space-y-3">
          
                    <motion.div 
                      className="grid grid-cols-2 gap-2"
                      variants={{
                        open: {
                          transition: { staggerChildren: 0.05, delayChildren: 0.15 }
                        },
                        closed: {
                          transition: { staggerChildren: 0.02, staggerDirection: -1 }
                        }
                      }}>
                      {[
                        { min: "4", max: "5", label: "Excellent", desc: "4+ stars" },
                        { min: "3", max: "5", label: "Good+", desc: "3+ stars" }
                      ].map((option, index) => (
                        <motion.button
                          key={`${option.min}-${option.max}`}
                          onClick={() => {
                            if (minRating === option.min && maxRating === option.max) {
                              setMinRating("");
                              setMaxRating("");
                            } else {
                              setMinRating(option.min);
                              setMaxRating(option.max);
                            }
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                            minRating === option.min && maxRating === option.max
                              ? 'bg-emerald-500 text-white border-emerald-500' 
                              : 'border-gray-300 hover:border-emerald-300'
                          }`}
                          style={{
                            backgroundColor: minRating === option.min && maxRating === option.max
                              ? '#10b981' 
                              : theme === 'dark' ? '#374151' : '#ffffff',
                            borderColor: minRating === option.min && maxRating === option.max
                              ? '#10b981' 
                              : theme === 'dark' ? '#4b5563' : '#d1d5db',
                            color: minRating === option.min && maxRating === option.max
                              ? '#ffffff' 
                              : theme === 'dark' ? '#f9fafb' : '#374151'
                          }}
                          variants={{
                            open: {
                              opacity: 1,
                              scale: 1,
                              y: 0,
                              transition: { 
                                duration: 0.3, 
                                ease: "easeOut",
                                delay: index * 0.05
                              }
                            },
                            closed: {
                              opacity: 0,
                              scale: 0.8,
                              y: 10,
                              transition: { 
                                duration: 0.2, 
                                ease: "easeIn"
                              }
                            }
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ 
                            scale: 0.95,
                            transition: { duration: 0.1 }
                          }}>
                          <div className="flex flex-col items-center">
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-2 h-2 ${i < parseInt(option.min) ? 'fill-current' : ''}`} />
                              ))}
                            </div>
                            <span>{option.label}</span>
                            <span className="text-xs opacity-75">{option.desc}</span>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                    
                   
                    <motion.div
                      variants={{
                        open: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.3, ease: "easeOut", delay: 0.25 }
                        },
                        closed: {
                          opacity: 0,
                          y: 10,
                          transition: { duration: 0.2, ease: "easeIn" }
                        }
                      }}>
                      <label 
                        className="text-xs font-medium mb-1 block"
                        style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        Custom range:
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          placeholder="Min"
                          value={minRating}
                          onChange={(e) => setMinRating(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all duration-200"
                          style={{
                            backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                            borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                            color: theme === 'dark' ? '#f9fafb' : '#1f2937'
                          }}/>
                        <span 
                          className="text-xs px-2"
                          style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                          to
                        </span>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          placeholder="Max"
                          value={maxRating}
                          onChange={(e) => setMaxRating(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all duration-200"
                          style={{
                            backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                            borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                            color: theme === 'dark' ? '#f9fafb' : '#1f2937'
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>


        <div className="text-center">
          <p 
            className="text-sm"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            Showing {displayMeals.length} of {total} meals
            {hasActiveFilters && ' (filtered)'}
          </p>
        </div>
      </motion.div>

   
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}>
        {displayMeals.map((meal) => (
          <motion.div
            key={meal._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}>
            <MealCard meal={meal} />
          </motion.div>
        ))}
      </motion.div>


      {!hasActiveFilters && totalPages > 1 && (
        <motion.div
          className="flex justify-center mt-12 gap-2 flex-wrap"
          initial="hidden"
          animate="visible"
          variants={fadeUp}>
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className="px-4 py-2 rounded-full font-semibold shadow transition-all duration-300"
              style={{
                backgroundColor: page === i + 1 
                  ? '#10b981' 
                  : theme === 'dark' ? '#374151' : '#e5e7eb',
                color: page === i + 1 
                  ? '#ffffff' 
                  : theme === 'dark' ? '#f9fafb' : '#1f2937',
                transform: page === i + 1 ? 'scale(1.05)' : 'scale(1)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                if (page !== i + 1) {
                  e.target.style.backgroundColor = theme === 'dark' ? '#4b5563' : '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                if (page !== i + 1) {
                  e.target.style.backgroundColor = theme === 'dark' ? '#374151' : '#e5e7eb';
                }
              }}>
              {i + 1}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Meals;
