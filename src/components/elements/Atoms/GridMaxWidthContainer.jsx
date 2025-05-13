import React from 'react';

// eslint-disable-next-line import/no-default-export
const GridMaxWidthContainer = ({ children, className, ...props }) => {
  return (
    <div
      className={[
        'relative w-full max-w-8xl mx-auto grid grid-cols-12',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default GridMaxWidthContainer;
