
import React from 'react';
import Banner from './Banner';
import DailyMeals from './DailyMeals';
import StatsSection from './StatsSection';
import HowItWorksSection from './HowItWorksSection';
import FeaturedChefsSection from './FeaturedChefsSection';
import ReviewsSection from '../../pages/Home/ReviewSection';
import TestimonialsSection from './TestimonialsSection';
import ExtraSection from './ExtraSection';
import AboutSection from './AboutSection';
import FAQSection from './FAQSection';
import NewsletterSection from './NewsletterSection';

const Home = () => {
  return (
    <div className="space-y-0">
      <Banner />
      <StatsSection />
      <DailyMeals />
      <HowItWorksSection />
      <FeaturedChefsSection />
      <ReviewsSection />
      <TestimonialsSection />
      <ExtraSection />
      <AboutSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
