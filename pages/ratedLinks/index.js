import { useState, useEffect } from "react";
import { urlFetcher } from "../../lib/urlFetcher";
import RatedLinkTitle from "../../components/ratingDone/ratedHeader";
import axios from "axios";
const ratedLinks = () => {
  const [liksTitle, setLinksTitle] = useState([]);

  //function to fetch the titles
  const fetchRatedLinksTitle = async () => {
    await axios
      .get(`${urlFetcher}/api/fetchTitle`)
      .then((response) => {
        setLinksTitle(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch link title here
  useEffect(() => {
    fetchRatedLinksTitle();
  }, []);

  return (
    <>
      {/* This is admin panel. */}
      <div className="p-2 flex justify-center text-2xl ">Rated Links</div>
      <div className="p-10">
        {liksTitle.map((link) => (
          <RatedLinkTitle
            id={link.id}
            createdAt={link.created_at}
            title={link.title}
          />
        ))}
      </div>
    </>
  );
};

export default ratedLinks;
