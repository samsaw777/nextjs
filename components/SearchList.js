import React, { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import Link from "./Links";
const SearchList = ({ id, createdAt, title }) => {
  const [currentId, setCurrentId] = useState("");
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [fetctLinkVariable, setFetchLinkVariable] = useState(false);
  console.log(links);
  //fetch the links corresponding the keyword id
  const fetchLinks = async () => {
    const { data: links, errors } = await supabase
      .from("links")
      .select("*")
      .match({ kid: id })
      .match({ rating: 0 });

    if (errors) {
      console.log(errors);
    } else {
      setLinks(links);
    }
  };
  //onLoad fetch the links
  useEffect(() => {
    fetchLinks();
  }, [fetctLinkVariable]);

  const showList = (id) => {
    setCurrentId(id);
    setOpen((open) => !open);
  };

  return (
    <div className="w-full pb-5" key={id}>
      <div className="w-full flex flex-col pb-2">
        <div className="w-full text-sm">{createdAt}</div>
        <div className="flex justify-between w-full">
          <div className="text-lg">{title}</div>
          <div onClick={() => showList(id)} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={currentId === id && open ? "block" : "hidden"}>
        {links.length !== 0 ? (
          links.map((link) => (
            <Link
              link={link.link}
              kid={link.kid}
              id={link.id}
              rating={link.rating}
              fetchLinkVariable={setFetchLinkVariable}
            />
          ))
        ) : (
          <div>This keyword has no links found and stored in the database.</div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
