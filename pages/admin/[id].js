import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { urlFetcher } from "../../lib/urlFetcher";
import Image from "next/image";
import Tab from "../../components/Tab";
import RatedLinks from "../../components/Rated";
import NonRatedLinks from "../../components/NonRated";

const LinksPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  //   const [id, setId] = useState("");
  const [keyword, setKeyword] = useState({});
  const [keywordLinks, setKeywordLinks] = useState([]);
  const [ratedLinks, setRatedLinks] = useState([]);
  console.log(ratedLinks);
  const [ratingVariable, setRatingVariable] = useState(false);
  const [currentTab, setCurrentTab] = useState("rated");
  console.log(keyword);
  console.log(keywordLinks);

  //Fetch links.
  const fetchLinks = async () => {
    const intId = Number(id);

    const body = { id: intId };
    const response = await fetch(`${urlFetcher()}/api/fetchLinks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setKeywordLinks(data);
  };

  //Fetch rated links
  const fetchRatedLinks = async () => {
    const intId = Number(id);

    const body = { id: intId };
    const response = await fetch(`${urlFetcher()}/api/getRatedLinks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    // console.log(data);
    setRatedLinks(data);
  };

  //Fetch links Keywords.
  const fetchLinkKeyword = async () => {
    const intId = Number(id);

    const body = { id: intId };
    const response = await fetch(`${urlFetcher()}/api/getTitle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setKeyword(data);
  };

  //Function will be called we the page is loaded.
  useEffect(() => {
    fetchLinkKeyword();
    fetchLinks();
    fetchRatedLinks();
  }, []);

  //Function when rating is done.
  useEffect(() => {
    fetchLinkKeyword();
    fetchLinks();
  }, [ratingVariable]);

  return (
    <div className="block mx-5 mt-10">
      <div className="bg-white rounded-md shadow-md p-4 space-y-4">
        <div className="flex justify-between">
          <div className=" flex text-xl pt-3">{keyword[0]?.title}</div>
          <div className="flex ">
            {keyword[0]?.user_image && (
              <Image
                src={keyword[0]?.user_image}
                width="50"
                height="50"
                className="rounded-full"
              />
            )}

            <div className="flex flex-col ml-3">
              <span className="text-lg">{keyword[0]?.user_name}</span>
              <span className="text-md">{keyword[0]?.user_email}</span>
            </div>
          </div>
        </div>
      </div>
      <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === "rated" ? (
        <RatedLinks ratedLinks={ratedLinks} />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {keywordLinks.map((link) => (
            <NonRatedLinks
              id={link.id}
              link={link.link}
              setRatingVariable={setRatingVariable}
              ratingVariable={ratingVariable}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinksPage;
