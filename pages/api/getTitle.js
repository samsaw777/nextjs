import { supabase } from "../../lib/initSupabase";

export default async (req, res) => {
  const { id } = req.body;

  const { data: title, error } = await supabase
    .from("keywords")
    .select("title")
    .match({
      id: id,
    });

  if (error) {
    res.status(404).send(error);
  } else {
    res.status(200).send(title);
  }
};
