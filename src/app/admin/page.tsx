import { getUserContext } from "@/lib/auth/get-user-context";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const { membership, church } = await getUserContext();
  const supabase = await createClient();

  const { count: memberCount } = await supabase
    .from("church_members")
    .select("*", { count: "exact", head: true })
    .eq("church_id", membership.church_id);

  const { data: recentMembers } = await supabase
    .from("church_members")
    .select(`
      id,
      role,
      created_at,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .eq("church_id", membership.church_id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Hoş geldiniz
        </h1>

        <p className="mt-1 text-gray-500">
          {church.name} yönetim paneline hoş geldiniz.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Toplam Üye"
          value={memberCount ?? 0}
        />

        <StatCard
          title="Rolünüz"
          value={membership.role}
        />

        <StatCard
          title="Kilise"
          value={church.name}
        />

        <StatCard
          title="Durum"
          value="Aktif"
        />
      </div>

      <section className="rounded-xl border bg-white">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">Son Katılan Üyeler</h2>
        </div>

        <div className="divide-y">
          {recentMembers?.map((member) => {
            const profile = Array.isArray(member.profiles)
              ? member.profiles[0]
              : member.profiles;

            return (
              <div
                key={member.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-medium">
                    {profile?.full_name || "İsimsiz kullanıcı"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {member.role}
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(member.created_at).toLocaleDateString("tr-TR")}
                </span>
              </div>
            );
          })}

          {!recentMembers?.length && (
            <div className="px-6 py-8 text-center text-gray-500">
              Henüz üye bulunmuyor.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-2 truncate text-2xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}