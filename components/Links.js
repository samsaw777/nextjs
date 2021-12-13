import React, { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
const Lists = ({ link, id, title, linkId }) => {
  const [searchList, setSearchLit] = useState([]);

  const [loading, setLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingStar, setRatingStar] = useState(false);
  const fetchList = async () => {
    const { data, error } = await supabase
      .from("searchLinks")
      .select("links")
      .order("id", true);
    if (error) console.log("error", error);
    else setSearchLit(data);
  };

  useEffect(() => {
    fetchList();
  }, []);
  const addRating = async (id, e) => {
    console.log(id);
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("searchLinks")
      .update(
        `links:{
      rating:${ratingValue}
    }`
      )
      .eq("links->id", id);
    if (error) {
      console.log("error", error);
    } else {
      setLoading(false);
      setRatingStar(true);
      fetchList();
      setRatingValue(0);
      console.log(data);
    }
  };
  return (
    <div className="flex justify-between pb-2" key={linkId}>
      <div className="max-w-4xl">{link}</div>
      <div>
        <div className={"flex"}>
          <form className="flex" onSubmit={(e) => addRating(linkId, e)}>
            <div className="mr-2 p-2">
              <input
                type="text"
                value={ratingValue}
                onChange={(e) => setRatingValue(e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-20 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-2"
              />
              <span>/5</span>
            </div>
            <button
              className="bg-purple-500 text-white cursor-pointer rounded w-20"
              type="submit"
            >
              Rate
            </button>
          </form>
        </div>
        {/* <div className={ratingStar ? 'block' : 'hidden'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div> */}
      </div>
    </div>
  );
};

export default Lists;