import React, { useState, useEffect } from "react";

const Rated = ({ ratedLinks }) => {
  console.log(ratedLinks);
  return (
    <div className="grid grid-cols-2 gap-2">
      {ratedLinks.map((ratedLink) => (
        <div className="flex justify-between bg-white rounded-md shadow-md p-4 space-y-4 hover:bg-gray-100">
          <a href={ratedLink.link} className="w-11/12">
            {ratedLink.link}
          </a>
          <div className="">{ratedLink.rating} / 5</div>
        </div>
      ))}
    </div>
  );
};

export default Rated;
