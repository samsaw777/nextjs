import { supabase } from "../../lib/initSupabase";
import axios from "axios";
import { urlFetcher } from "../../lib/urlFetcher";
export default async (req, res) => {
  const { keyword } = req.body;

  //add the keyword into the database
  const { data: keywordData, errors } = await supabase
    .from("keywords")
    .insert({ title: keyword });

  if (errors) {
    res.status(400).send(errors);
  } else {
    res.status(200).send("keyword added in the database!");

    await axios.post(`${urlFetcher()}/api/setupKeyword`, {
      keyword: keyword,
      keywordId: keywordData[0].id,
    });
  }
};
