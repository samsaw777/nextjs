import { Auth, Button } from "@supabase/ui";
import Link from "next/link";
import SearchLink from "./SearchLink";
import signIn from "../Utils/signIn";
const Container = (props) => {
  const { user } = Auth.useUser();
  console.log(user);
  const { supabaseClient } = props;

  if (user) {
    return (
      <>
        <SearchLink />
      </>
    );
  } else {
    return <Button onClick={() => signIn(supabaseClient)}>Login In</Button>;
  }
};

export default Container;
