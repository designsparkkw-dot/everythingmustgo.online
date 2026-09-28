"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const supabase = getSupabase();
    if (!supabase) {
      setErr("Sign-in isn't configured on this deployment yet.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setErr(error.message);
    else router.push("/my-listings");
  };

  return (
    <>
      <PageHero eyebrow="Welcome back" title="Sign in to EMG" description="Access your listings and messages." />
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
          {!supabaseConfigured && (
            <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
              Auth not configured. Add Supabase env vars to enable sign-in.
            </div>
          )}

          <GoogleSignInButton />

          <div className="flex items-center gap-3 text-xs text-black/40">
            <span className="h-px flex-1 bg-black/10" /> or continue with email <span className="h-px flex-1 bg-black/10" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <p className="text-center text-sm text-black/60">
            New to EMG? <Link href="/signup" className="font-semibold text-[#FF7A00] hover:underline">Create an account</Link>
          </p>
        </form>
      </div>
    </>
  );
}
