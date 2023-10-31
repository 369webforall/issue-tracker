import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const LoadingNewIssuePage = () => {
  return (
    <div className="max-w-2xl">
      <Skeleton />
      <Skeleton height="16rem" />
    </div>
  );
};

export default LoadingNewIssuePage;
