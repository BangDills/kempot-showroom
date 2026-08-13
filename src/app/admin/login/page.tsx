"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (err) {
      setError("Email atau password salah. Coba lagi.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  const inputCls =
    "w-full rounded-[10px] border border-line bg-white px-3.5 py-3 text-sm outline-none focus:border-navy";

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-3xl border border-line bg-white p-9"
      >
        <div className="mb-1 font-display text-lg font-black text-navy">
          KEMPOT<span className="text-brand-dark">.</span>
        </div>
        <h1 className="font-display mt-5 text-2xl font-black text-navy">Masuk Admin</h1>
        <p className="mb-6 mt-1 text-[13px] text-muted">
          Area khusus pengelola untuk mengatur stok mobil.
        </p>

        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
          Email
        </label>
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputCls} mb-4`}
          placeholder="admin@kempot.id"
        />

        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
          Password
        </label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputCls} mb-5`}
          placeholder="••••••••"
        />

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2.5 text-[13px] font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-navy py-3 text-[15px] font-semibold text-white hover:bg-navy-deep disabled:opacity-60"
        >
          {loading ? "Memeriksa…" : "Masuk"}
        </button>

        <div className="mt-4 text-center">
          <a href="/" className="text-[13px] font-medium text-muted hover:text-ink">
            ← Kembali ke Showroom
          </a>
        </div>
      </form>
    </main>
  );
}
}
