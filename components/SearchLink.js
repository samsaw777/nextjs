import { useState } from "react";

import { supabase } from "../lib/initSupabase";
import axios from "axios";

const SearchList = () => {
  const [newTaskText, setNewTaskText] = useState("");
  const [errorText, setError] = useState("");
  console.log(errorText);
  const [fetching, setFetching] = useState(false);

  // Adding the searched ouptut link in the supabase database
  const addList = async (links) => {
    if (links.length) {
      let { data, error } = await supabase
        .from("searchLinks")
        .insert({ title: newTaskText, links: links })
        .single();
      if (error) setError(error.message);
      else console.log("sucessfully added into the document");
    }
  };

  // Taking the input and searching for the top ten google sites.
  const searchTopTenSites = async (e) => {
    e.preventDefault();
    const linkList = [];
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
    setFetching(true);

    await axios
      .request(options)
      .then(function (response) {
        response.data.results.map((result, index) => {
          linkList.push({
            id: index + 1,
            link: result.link,
            rating: null,
          });
        });
        addList(linkList);
        setNewTaskText("");
        setFetching(false);
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
              className="rounded w-full p-2"
              type="text"
              placeholder="make coffee"
              value={newTaskText}
              onChange={(e) => {
                setError("");
                setNewTaskText(e.target.value);
              }}
            />
            <button className="btn-black" type="submit">
              Search
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchList;
