import React, { useState, useEffect, useCallback } from 'react';

interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}

const DUMMY_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Alice Johnson',
    text: '이 제품은 제 기대를 뛰어넘었습니다! 품질이 정말 훌륭하고 배송도 매우 빨랐어요. 강력 추천합니다!',
    rating: 5,
  },
  {
    id: '2',
    author: 'Bob Smith',
    text: '전반적으로 좋은 제품이지만, 설치에 약간의 문제가 있었습니다. 고객 서비스팀이 해결하는 데 도움을 주었죠.',
    rating: 4,
  },
  {
    id: '3',
    author: 'Charlie Brown',
    text: '정말 환상적입니다! 온라인 구매 중 이보다 만족스러웠던 적이 없습니다. 디자인도 세련되고 기능적이에요.',
    rating: 5,
  },
  {
    id: '4',
    author: 'Diana Prince',
    text: '괜찮았어요, 특별할 건 없네요. 말한 대로 작동하지만, 가격에 비해 조금 더 기대했습니다.',
    rating: 3,
  },
  {
    id: '5',
    author: 'Eve Adams',
    text: '정말로 혁신적인 솔루션입니다! 시간과 노력을 많이 절약해 주었어요. 전문가에게는 필수품입니다.',
    rating: 5,
  },
  {
    id: '6',
    author: 'Frank White',
    text: '나쁘지 않지만, 개선될 여지가 있습니다. 사용자 인터페이스가 가끔 투박하게 느껴져요.',
    rating: 3,
  },
];

interface ReviewCardProps {
  review: Review;
  isActive: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isActive }) => {
  const cardClasses = `
    flex-shrink-0
    p-6
    rounded-lg
    shadow-xl
    bg-white
    text-gray-800
    w-64 sm:w-72 md:w-80
    max-w-xs
    h-64 sm:h-72 md:h-80
    flex flex-col justify-between
    transition-all duration-500 ease-in-out
    transform
    ${isActive ? 'opacity-100 scale-100 ring-4 ring-indigo-500 z-10' : 'opacity-40 scale-90 z-0'}
  `;

  return (
    <div className={cardClasses}>
      <p className="text-sm italic mb-4 flex-grow overflow-hidden">"{review.text}"</p>
      <div className="text-right">
        <p className="font-semibold text-indigo-700">- {review.author}</p>
        <div className="flex justify-end mt-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalReviews = DUMMY_REVIEWS.length;

  const getPrevIndex = useCallback((index: number) => {
    return (index - 1 + totalReviews) % totalReviews;
  }, [totalReviews]);

  const getNextIndex = useCallback((index: number) => {
    return (index + 1) % totalReviews;
  }, [totalReviews]);

  const leftReviewIndex = getPrevIndex(currentIndex);
  const rightReviewIndex = getNextIndex(currentIndex);

  const displayedReviews = [
    DUMMY_REVIEWS[leftReviewIndex],
    DUMMY_REVIEWS[currentIndex],
    DUMMY_REVIEWS[rightReviewIndex],
  ];

  const goToNext = () => {
    setCurrentIndex(getNextIndex(currentIndex));
  };

  const goToPrev = () => {
    setCurrentIndex(getPrevIndex(currentIndex));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, goToNext]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="relative flex justify-center items-center gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl">
        <button
          onClick={goToPrev}
          className="absolute left-0 lg:left-8 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-colors duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          aria-label="Previous review"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        {displayedReviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            review={review}
            isActive={index === 1}
          />
        ))}

        <button
          onClick={goToNext}
          className="absolute right-0 lg:right-8 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition-colors duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          aria-label="Next review"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewSlider;