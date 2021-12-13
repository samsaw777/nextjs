import SearchLink from "../components/SearchLink";
export default function Home() {
  return (
    <div className="w-full h-full bg-gray-300">
      (
      <div
        className="w-full h-full flex flex-col justify-center items-center p-4"
        style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
      >
        <SearchLink />
      </div>
      )
    </div>
  );
}
