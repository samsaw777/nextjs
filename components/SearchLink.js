import { useState } from "react";
import crypto from "crypto";
import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import axios from "axios";
import { urlFetcher } from "../lib/urlFetcher";

const SearchList = () => {
  const { user } = Auth.useUser();
  const [keyword, setKeyword] = useState("");
  const [errorText, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  // Taking the input and searching for the top ten google sites.
  const searchTopTenSites = async (e) => {
    e.preventDefault();

    await axios
      .post(`${urlFetcher()}/api/addKeyword`, {
        keyword,
        user_id: user.id,
        user_email: user.user_metadata.email,
        user_name: user.user_metadata.name,
        user_image: user.user_metadata.avatar_url,
      })
      .then((res) => {
        setKeyword("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="w-full flex flex-col justify-center items-center p-4 h-screen"
      style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
    >
      <h1>Hello {user.user_metadata.full_name}</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
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
    </div>
  );
};

export default SearchList;
