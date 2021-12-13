import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import SearchList from "../components/SearchList";
const Admin = () => {
  const [searchList, setSearchLit] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    const { data, error } = await supabase
      .from("searchLinks")
      .select("*")
      .order("id", true);
    if (error) console.log("error", error);
    else setSearchLit(data);
  };

  const addRating = async (id, e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("searchList")
      .update({ rating: ratingValue })
      .eq("id", id);
    if (error) {
      console.log("error", error);
    } else {
      setLoading(false);
      console.log("Updated the rating of the link in the database.");
    }
  };
  const showList = (id) => {
    setCurrentId(id);
    setOpen((open) => !open);
  };
  return (
    <>
      <div className="p-10">
        {searchList.map((link) => (
          <SearchList
            id={link.id}
            createdAt={link.created_at}
            title={link.title}
            links={link.links}
          />
        ))}
      </div>
    </>
  );
};

export default Admin;
//className={ ? 'block' : 'hidden'}
