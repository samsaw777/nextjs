import React, { useState, useEffect } from "react";
import { urlFetcher } from "../lib/urlFetcher";

const NonRated = ({ link, id, ratingVariable, setRatingVariable }) => {
  const [ratingValue, setRatingValue] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //check if the value is less than 5 or not
  const checkRatingValue = (value) => {
    if (value > 5 || value < 0) {
      alert("value should be between 5 and 0");
      setError(true);
    } else {
      setRatingValue(value);
      setError(false);
    }
  };

  //Add rating to the links.
  const addRating = async (id, e) => {
    e.preventDefault();
    setLoading(true);
    const body = { id, ratingValue };
    await fetch(`${urlFetcher()}/api/addRating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setRatingVariable(!ratingVariable);
        setLoading(false);
        setRatingValue("");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div
      className="flex justify-between bg-white rounded-md shadow-md p-4 space-y-4 hover:bg-gray-100"
      key={id}
    >
      <div className="flex w-9/12">
        <a
          className="max-w-4xl hover:text-blue-500"
          href={link}
          target="_blank"
        >
          {link}
        </a>
      </div>
      <div>
        <div className={"flex"}>
          <form className="flex" onSubmit={(e) => addRating(id, e)}>
            <div className="mr-2 p-2">
              <input
                type="text"
                value={ratingValue}
                onChange={(e) => checkRatingValue(e.target.value)}
                className={
                  "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-20 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white  mr-2" +
                  (error
                    ? "border-2 focus:border-red-700"
                    : "border-2 focus:border-gray-900")
                }
              />
              <span>/5</span>
            </div>
            <button
              className="bg-purple-500 text-white cursor-pointer rounded w-10 h-10 mt-3"
              type="submit"
            >
              Rate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NonRated;
