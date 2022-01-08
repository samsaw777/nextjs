import refetchQueue from "./queues/refetch";

export default async (req, res) => {
  const { keyword, keywordId, user_name, user_email, user_image, user_id } =
    req.body;

  const data = {
    keyword,
    keywordId,
    user_name,
    user_email,
    user_image,
    user_id,
  };
  await refetchQueue.enqueue(data, {
    id: keyword,
    // delay: "1min",
    repeat: {
      every: "168h",
    },
  });

  res.status(200).end();
};
