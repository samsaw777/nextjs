import { useState, useEffect } from "react";
import SearchList from "../../components/rating/SearchList";
import axios from "axios";
import { urlFetcher } from "../../lib/urlFetcher";

const Admin = () => {
  const [searchList, setSearchLit] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    axios
      .get(`${urlFetcher()}/api/fetchTitle`)
      .then((response) => {
        setSearchLit(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* This is admin panel. */}
      <div className="p-2 flex justify-center text-2xl ">Admin</div>
      <div className="p-10">
        {searchList.map((link) => (
          <SearchList
            id={link.id}
            createdAt={link.created_at}
            title={link.title}
            // links={link.links}
          />
        ))}
      </div>
    </>
  );
};

export default Admin;
