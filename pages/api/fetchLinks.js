import { supabase } from "../../lib/initSupabase";

export default async (req, res) => {
  const { id } = req.body;

  const { data: links, error } = await supabase
    .from("links")
    .select("*")
    .match({ kid: id })
    .match({ rating: 0 });

  if (error) {
    res.status(404).send(error);
  } else {
    res.status(200).send(links);
  }
};
