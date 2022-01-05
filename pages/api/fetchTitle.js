import { supabase } from "../../lib/initSupabase";

export default async (req, res) => {
  //fetching the keywords
  const { data: keywords, error } = await supabase
    .from("keywords")
    .select("*")
    .order("id", true);

  if (error) {
    res.status(400).send(error);
  } else {
    res.status(200).send(keywords);
  }
};
