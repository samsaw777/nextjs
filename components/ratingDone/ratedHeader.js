import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/initSupabase";
// import Link from "./ratedLink";
import Link from "next/link";

const ratedTitle = ({ id, title, createdAt }) => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [open, setOpen] = useState(false);
  //function to fetch the rated links
  const fetchRatedLinks = async () => {
    const { data: ratedLinks, errors } = await supabase
      .from("links")
      .select("*")
      .match({ kid: id })
      .not("rating", "eq", 0);
    //   .match({ rating: !0 });

    if (errors) {
      console.log(errors);
    } else {
      setLinks(ratedLinks);
    }
  };

  //Load the rated links
  useEffect(() => {
    fetchRatedLinks();
  }, []);

  //to show the links
  const showList = (id) => {
    setCurrentId(id);
    setOpen((open) => !open);
  };
  return (
    <Link href={`/ratedLinks/${id}`}>
      <div className="w-full pb-5 cursor-pointer" key={id}>
        <div className="w-full flex flex-col pb-2">
          <div className="w-full text-sm">{createdAt}</div>
          <div className="flex justify-between w-full">
            <div className="text-lg">{title}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ratedTitle;
