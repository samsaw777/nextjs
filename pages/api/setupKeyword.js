import refetchQueue from "./queues/refetch";

export default async (req, res) => {
  const { keyword, keywordId } = req.body;

  const data = { keyword, keywordId };
  await refetchQueue.enqueue(data, {
    id: keyword,
    // delay: "1min",
    repeat: {
      every: "168min",
    },
  });

  res.status(200).end();
};
