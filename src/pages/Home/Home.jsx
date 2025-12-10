
import React from 'react';
import Banner from './Banner';
import DailyMeals from './DailyMeals';
import ReviewsSection from '../../pages/Home/ReviewSection';
import ExtraSection from './ExtraSection';

const Home = () => {

  return (

    <div className="space-y-12">
      <Banner />
      <DailyMeals />
      <ReviewsSection />
      <ExtraSection />
    </div>
    
  );
};

export default Home;
