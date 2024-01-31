import React from "react";

const OverView = ({ imgUrl, title, value, growth }) => {
  return (
    <div className="w-60 m-2 flex flex-col items-start justify-between p-9 border rounded-lg border-dashed border-gray-300">
      <div className="m-0">
        <img className="w-32" src={imgUrl} alt="youtube" />
      </div>
      <div className="flex flex-col my-7">
        <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">
          {value}
        </span>
        <div className="m-0">
          <span className="font-medium text-secondary-dark text-lg/normal">
            {title}
          </span>
        </div>
      </div>
      <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
          ></path>
        </svg>
        {growth}
      </span>
    </div>
  );
};

export default OverView;
