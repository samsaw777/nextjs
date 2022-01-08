import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "../../components/ratingDone/ratedLink";
import { urlFetcher } from "../../lib/urlFetcher";
import axios from "axios";

const DynamicLinks = () => {
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);
  const [ratedLinks, setRatedLinks] = useState([]);
  const [title, setTitle] = useState([]);

  const [link, setLinks] = useState([]);
  // console.log(link);
  //function to fetch the rated links
  const fetchRatedLinks = async () => {
    const body = { id };
    await axios
      .post(`${urlFetcher()}/api/getRatedLinks`, body)
      .then((response) => {
        setRatedLinks(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //fetch the title of the link
  const fetchTitle = async () => {
    const body = { id };
    await axios
      .post(`${urlFetcher()}/api/getTitle`, body)
      .then((response) => {
        setTitle(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Load the rated links
  useEffect(() => {
    fetchRatedLinks();
    fetchTitle();
  }, []);
  return (
    <>
      <div className="flex justify-center text-2xl text-black">
        {title[0]?.title}
      </div>
      <div className="p-4">
        {ratedLinks.map((link) => (
          <Link id={link.id} rating={link.rating} link={link.link} />
        ))}
      </div>
    </>
  );
};

export default DynamicLinks;
