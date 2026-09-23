import { supabase } from "../lib/supabase/client";

export default async function Home() {
  const { error } = await supabase
    .from("churches")
    .select("id")
    .limit(1);

  return (
    <main>
      <h1>Kilise App</h1>

      {error ? (
        <p>Supabase bağlantısı çalışıyor. Tablo henüz oluşturulmadı.</p>
      ) : (
        <p>Supabase bağlantısı başarılı.</p>
      )}
    </main>
  );
}