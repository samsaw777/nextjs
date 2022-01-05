import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { urlFetcher } from "../../lib/urlFetcher";
import Link from "../../components/rating/Links";
import axios from "axios";

const RatingLinksDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [links, setLinks] = useState([]);
  console.log(links);
  const [error, setError] = useState("");
  const [fetchVariable, setFetchVariable] = useState(false);
  const [title, setTitle] = useState([]);
  console.log(title);

  const fetchLinks = (id) => {
    const body = { id };
    axios
      .post(`${urlFetcher()}/api/fetchLinks`, body)
      .then((response) => {
        setLinks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTitle = (id) => {
    const body = { id };
    axios
      .post(`${urlFetcher()}/api/getTitle`, body)
      .then((response) => {
        setTitle(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // call the fetch link function to get the links
  useEffect(() => {
    fetchLinks(id);
    getTitle(id);
  }, []);

  // refetch after add rating
  useEffect(() => {
    fetchLinks(id);
    getTitle(id);
  }, [fetchVariable]);
  //returing the links here
  return (
    <>
      <div className="flex justify-center text-2xl text-black">
        {title[0]?.title}
      </div>
      <div className="p-2">
        {links.length !== 0 ? (
          <div className="p-2">
            {links.map((link) => (
              <Link
                link={link.link}
                kid={link.kid}
                id={link.id}
                rating={link.rating}
                fetchLinkVariable={setFetchVariable}
                fetchVariable={fetchVariable}
              />
            ))}
          </div>
        ) : (
          <div>
            This Keyword has no links pending for rating go to rated route to
            see the rating of the links
          </div>
        )}
      </div>
    </>
  );
};

export default RatingLinksDetails;
