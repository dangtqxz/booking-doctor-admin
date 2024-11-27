import React from 'react';
import HelmetWrapper from '../components/HelmetWrapper';
import PostCard from '../components/PostCard';
import { dataHealthTips } from '../contains/data-fake';


const Healthy: React.FC = () => {
  return (
    <HelmetWrapper title="Sức khỏe đời sống">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">Sức khỏe đời sống</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {dataHealthTips.map((tip) => (
          <div key={tip.id} className="w-full">
            <PostCard
              id={tip.id}
              title={tip.title}
              content={tip.content}
              author={tip.author}
              publishDate={tip.publishDate}
              category={tip.category}
              imageUrl={tip.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
    </HelmetWrapper>
  );
};

export default Healthy;
