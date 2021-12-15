import { useState } from "react";

import { supabase } from "../lib/initSupabase";
import axios from "axios";

const SearchList = () => {
  const [newTaskText, setNewTaskText] = useState("");
  const [errorText, setError] = useState("");
  const [keywordId, setKeywordId] = useState(null);
  console.log(keywordId);
  const [fetching, setFetching] = useState(false);

  // Adding the searched ouptut title in the supabase database
  const addKeyWord = async () => {
    let { data, error } = await supabase
      .from("keywords")
      .insert({ title: newTaskText });

    setKeywordId(data[0].id);

    //add the links into the tables
    if (error) setError(error.message);
    else console.log("sucessfully added into the database!");
  };

  //Adding the searched output list in the supabase database.
  const addOutputList = async (link, keywordId) => {
    console.log(keywordId);
    let { data, error } = await supabase.from("links").insert([
      {
        kid: keywordId,
        link: link,
        rating: 0,
      },
    ]);

    if (error) setError(error.message);
    else console.log("Links added into the liks database!");
  };

  // Taking the input and searching for the top ten google sites.
  const searchTopTenSites = async (e) => {
    e.preventDefault();
    setFetching(true);
    let { data: keywordData, error } = await supabase
      .from("keywords")
      .insert({ title: newTaskText });

    // setKeywordId(data[0].id);

    //add the links into the tables
    if (error) setError(error.message);
    else console.log("sucessfully added into the database!");
    // await addKeyWord();
    const options = {
      method: "GET",
      url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${newTaskText}&num=10`,
      headers: {
        "x-user-agent": "desktop",
        "x-proxy-location": "US",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": "416fbecb1amsh9d477032fa6414dp11c18ejsn07784bb5eb92",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        response.data.results.map((result, index) => {
          addOutputList(result.link, keywordData[0].id);
        });
        setNewTaskText("");
        setFetching(false);
        setKeywordId(null);
      })
      .catch(function (error) {
        console.error(error);
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
              value={newTaskText}
              onChange={(e) => {
                setError("");
                setNewTaskText(e.target.value);
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
