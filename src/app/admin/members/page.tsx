import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/get-user-context";

export default async function MembersPage() {
  const { membership, church } = await getUserContext();

  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("church_members")
    .select(`
      id,
      user_id,
      role,
      created_at,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .eq("church_id", membership.church_id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Üyeler
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {church.name} üye yönetimi
          </p>
        </div>

        <button
          className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Üye Ekle
        </button>

      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-3">

        <StatCard
          title="Toplam Üye"
          value={members?.length ?? 0}
        />

        <StatCard
          title="Yönetici"
          value={
            members?.filter((member) =>
              ["SUPER_ADMIN", "PASTOR", "ADMIN"].includes(
                member.role
              )
            ).length ?? 0
          }
        />

        <StatCard
          title="Üye"
          value={
            members?.filter(
              (member) => member.role === "MEMBER"
            ).length ?? 0
          }
        />

      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border bg-white">

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="border-b bg-slate-50">

              <tr>
                <th className="px-6 py-4 font-medium">
                  Üye
                </th>

                <th className="px-6 py-4 font-medium">
                  Rol
                </th>

                <th className="px-6 py-4 font-medium">
                  Katılım
                </th>

                <th className="px-6 py-4 font-medium">
                  İşlem
                </th>
              </tr>

            </thead>

            <tbody className="divide-y">

              {members?.map((member) => {

                const profile = Array.isArray(member.profiles)
                  ? member.profiles[0]
                  : member.profiles;

                return (
                  <tr
                    key={member.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                          {(profile?.full_name || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <div className="font-medium text-slate-900">
                            {profile?.full_name ||
                              "İsimsiz kullanıcı"}
                          </div>

                          <div className="text-xs text-slate-400">
                            {member.user_id}
                          </div>
                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4">
                      <RoleBadge role={member.role} />
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {new Date(
                        member.created_at
                      ).toLocaleDateString("tr-TR")}
                    </td>

                    <td className="px-6 py-4">

                      <button className="text-sm font-medium text-slate-700 hover:underline">
                        Yönet
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {!members?.length && (
          <div className="px-6 py-12 text-center text-slate-500">
            Bu kilisede henüz üye bulunmuyor.
          </div>
        )}

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function RoleBadge({
  role,
}: {
  role: string;
}) {
  const labels: Record<string, string> = {
    SUPER_ADMIN: "Super Admin",
    PASTOR: "Pastör",
    ADMIN: "Yönetici",
    WORSHIP_LEADER: "İbadet Lideri",
    MEMBER: "Üye",
  };

  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
      {labels[role] || role}
    </span>
  );
}