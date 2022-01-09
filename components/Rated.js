import React from "react";

const Rated = ({ ratedLinks }) => {
  return (
    <>
      {ratedLinks.length != 0 ? (
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
      ) : (
        <div className="text-lg font-medium">No links has been rated yet.</div>
      )}
    </>
  );
};

export default Rated;
