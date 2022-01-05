import { Queue } from "quirrel/next";
import axios from "axios";
import { supabase } from "../../../lib/initSupabase";

// function to save the links in the database
const addLinkToDatabase = async (link, keywordId) => {
  const date = new Date();
  date.setDate(date.getDate() + 7);

  const { data, error } = await supabase.from("links").insert([
    {
      kid: keywordId,
      link: link,
      rating: 0,
      check_date: date.toISOString(),
    },
  ]);

  if (error) console.log(error);
  else console.log("Links added into the database!");
};

//function to update the end date of the link
const updateLinkDate = async (link) => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const { data, returnError } = await supabase
    .from("links")
    .update({
      check_date: date.toISOString(),
    })
    .match({ link: link });

  if (returnError) {
    console.log(returnError);
  } else {
    console.log("sucessfully updated the link!");
  }
};

//setting up the queue for the cron job to be done
export default Queue("api/queues/refetch", async (payload) => {
  const { keyword, keywordId } = payload;
  //fetch all the links and compare.
  const allLinks = [];
  const { data: links, error } = await supabase
    .from("links")
    .select("link")
    .match({ kid: keywordId });

  if (error) console.log(error);
  else {
    console.log("1st");
    await links.forEach((link) => {
      allLinks.push(link.link);
    });
  }

  console.log(allLinks);
  //use the keyword to fetch the links

  const options = {
    method: "GET",
    url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${keyword}&num=10`,
    headers: {
      "x-user-agent": "desktop",
      "x-proxy-location": "US",
      "x-rapidapi-host": "google-search3.p.rapidapi.com",
      "x-rapidapi-key": "416fbecb1amsh9d477032fa6414dp11c18ejsn07784bb5eb92",
    },
  };

  // const linksArray = [];

  await axios
    .request(options)
    .then((response) => {
      response.data.results.map((result) => {
        if (allLinks.indexOf(result.link) != -1) {
          updateLinkDate(result.link);
        } else {
          addLinkToDatabase(result.link, keywordId);
        }
      });
    })
    .catch((error) => {
      return error;
    });

  // return linksArray;

  // console.log(payload);
});
