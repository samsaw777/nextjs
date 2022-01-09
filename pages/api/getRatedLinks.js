import { supabase } from "../../lib/initSupabase";

export default async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const { data: ratedLinks, errors } = await supabase
    .from("links")
    .select("*")
    .match({ kid: id })
    .not("rating", "eq", 0);

  if (errors) {
    res.status(404).send(errors);
  } else {
    res.status(200).send(ratedLinks);
  }
};
