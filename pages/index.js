import SearchLink from "../components/SearchLink";
import { Auth, Button } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import Container from "../components/Container";
import { useEffect } from "react";
import signIn from "../Utils/signIn";

export default function Home() {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetch("/api/auth", {
          method: "POST",
          headers: new Header({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <div className="w-full">
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container supabaseClient={supabase}></Container>
      </Auth.UserContextProvider>
      {/* <div
        className="w-full flex flex-col justify-center items-center p-4 h-screen"
        style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
      >
        <SearchLink />
      </div> */}
    </div>
  );
}
