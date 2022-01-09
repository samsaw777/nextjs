import React, { useState, useEffect } from "react";
import { urlFetcher } from "../../lib/urlFetcher";
import Link from "next/link";
import Image from "next/image";

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
    <div className="grid grid-cols-5 gap-2">
      {searchLinkKeyword.map((keyword) => (
        <Link href={`/admin/${keyword.id}`}>
          <div
            key={keyword.id}
            className="flex justify-between bg-white rounded-md shadow-md p-4 space-y-4 hover:bg-gray-100 cursor-pointer"
          >
            {keyword?.user_image && (
              <Image
                src={keyword?.user_image}
                width="40"
                height="40"
                className="rounded-full"
              />
            )}
            <div className="pb-3">{keyword.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminPage;
