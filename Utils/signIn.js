const signIn = async (supabase) => {
  const { error } = await supabase.auth.signIn({ provider: "google" });

  if (error) console.log(error);
};

export default signIn;
