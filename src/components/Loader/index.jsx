import React from 'react';

export const Loader = ({ color = '#fff', secondColor = '#000', width = 60, height = 60 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-20 -20 42 42"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      data-testid="oval-svg"
      aria-label="oval-loading"
      className="ml-2"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="0" cy="0" r="20" stroke={secondColor} strokeWidth="2"></circle>
          <path d="M20 0c0-9.94-8.06-20-20-20">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 0"
              to="360 0 0"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </g>
      </g>
    </svg>
  );
};
