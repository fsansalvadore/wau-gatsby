import React from 'react';

// eslint-disable-next-line import/no-default-export
const GridMaxWidthContainer = ({ children, ...props }) => {
  return (
    <div
      className="relative w-full max-w-6xl mx-auto grid grid-cols-12"
      {...props}
    >
      {children}
    </div>
  );
};

export default GridMaxWidthContainer;
