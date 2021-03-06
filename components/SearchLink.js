import { useState } from "react";
import crypto from "crypto";
import { supabase } from "../lib/initSupabase";
import axios from "axios";
import { urlFetcher } from "../lib/urlFetcher";

const SearchList = () => {
  const [keyword, setKeyword] = useState("");
  const [errorText, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  // Taking the input and searching for the top ten google sites.
  const searchTopTenSites = async (e) => {
    e.preventDefault();

    await axios
      .post(`${urlFetcher()}/api/addKeyword`, {
        keyword,
      })
      .then((res) => {
        setKeyword("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      {!fetching && (
        <form onSubmit={searchTopTenSites}>
          <div className="flex gap-2 my-2">
            <input
              className="rounded w-full p-2 border-2 border-gray-400 focus:outline-none"
              type="text"
              placeholder="keyword (Eg: Web 3.0)"
              value={keyword}
              onChange={(e) => {
                setError("");
                setKeyword(e.target.value);
              }}
            />
            <button
              className="bg-purple-500 p-5 rounded text-white"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      )}

      {fetching && <div>Fetching Links.</div>}
    </div>
  );
};

export default SearchList;
