import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/initSupabase";
import Link from "next/link";

const SearchList = ({ id, createdAt, title }) => {
  return (
    <Link href={`/rating/${id}`}>
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

export default SearchList;
