import React from "react";

const RatedLink = ({ link, id, rating }) => {
  return (
    <div className="flex justify-between pb-2" key={id}>
      <div className="flex p-5">
        <span className="mr-5">{id}</span>

        <a
          className="max-w-4xl hover:text-blue-500"
          href={link}
          target="_blank"
        >
          {link}
        </a>
      </div>
      <div className="text-2xl text-black">{rating}/5</div>
    </div>
  );
};

export default RatedLink;
