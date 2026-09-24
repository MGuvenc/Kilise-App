import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/get-user-context";
import { redirect } from "next/navigation";

export default async function ChurchesPage() {
  const { membership } = await getUserContext();

  if (membership.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const supabase = await createClient();

  const { data: churches, error } = await supabase
    .from("churches")
    .select(`
      id,
      name,
      slug,
      description,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Kiliseler
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Platformdaki kiliseleri yönetin.
          </p>
        </div>

        <button
          className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Yeni Kilise
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-medium">
                  Kilise
                </th>

                <th className="px-6 py-4 font-medium">
                  Slug
                </th>

                <th className="px-6 py-4 font-medium">
                  Açıklama
                </th>

                <th className="px-6 py-4 font-medium">
                  İşlem
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {churches?.map((church) => (
                <tr
                  key={church.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {church.name}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs">
                      {church.slug}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {church.description || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <button className="text-sm font-medium text-slate-700 hover:underline">
                      Düzenle
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}