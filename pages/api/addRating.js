import { supabase } from "../../lib/initSupabase";

export default async (req, res) => {
  const { id, ratingValue } = req.body;

  const { data: rating, error } = await supabase
    .from("links")
    .update({ rating: ratingValue })
    .match({ id: id });

  if (error) {
    res.status(404).send(error);
  } else {
    res.status(200).send(rating);
  }
};
