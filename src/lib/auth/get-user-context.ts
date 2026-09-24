import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getUserContext() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: membership, error } = await supabase
    .from("church_members")
    .select(`
      id,
      church_id,
      role,
      churches (
        id,
        name,
        slug,
        description,
        logo_url
      )
    `)
    .eq("user_id", user.id)
    .limit(1)
    .single();

  if (error || !membership) {
    redirect("/");
  }

  const church = Array.isArray(membership.churches)
    ? membership.churches[0]
    : membership.churches;

  if (!church) {
    redirect("/");
  }

  return {
    user,
    membership,
    church,
  };
}