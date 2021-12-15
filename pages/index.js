import SearchLink from "../components/SearchLink";
export default function Home() {
  return (
    <div className="w-full">
      <div
        className="w-full flex flex-col justify-center items-center p-4 h-screen"
        style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
      >
        <SearchLink />
      </div>
    </div>
  );
}
