import React, { useState, useEffect } from "react";
import { urlFetcher } from "../../lib/urlFetcher";
import Link from "next/link";

const AdminPage = () => {
  const [searchLinkKeyword, setSearchLinkKeyword] = useState([]);
  console.log(searchLinkKeyword);
  //Fetch the link keyword.
  const fetchLinkKeyword = async () => {
    const response = await fetch(`${urlFetcher()}/api/fetchTitle`);
    const data = await response.json();
    setSearchLinkKeyword(data);
  };

  useEffect(() => {
    fetchLinkKeyword();
  }, []);

  return (
    <div>
      {searchLinkKeyword.map((keyword) => (
        <Link href={`/admin/${keyword.id}`}>
          <div key={keyword.id}>{keyword.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default AdminPage;
