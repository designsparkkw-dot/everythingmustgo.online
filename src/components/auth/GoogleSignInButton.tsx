"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

export default function GoogleSignInButton({ redirectPath = "/my-listings" }: { redirectPath?: string }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const signIn = async () => {
    const supabase = getSupabase();
    if (!supabase) { setErr("Auth not configured."); return; }
    setLoading(true); setErr(null);
    const redirectTo =
      typeof window !== "undefined" ? `${window.location.origin}${redirectPath}` : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) { setErr(error.message); setLoading(false); }
    // On success, browser redirects to Google; no need to unset loading.
  };

  return (
    <>
      <button
        type="button" onClick={signIn} disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:border-black/30 hover:bg-black/[0.02] disabled:opacity-50"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.3 6.2 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.3 6.2 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 34.9 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C9.4 39.6 16.1 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.3 5.3C41.4 35.6 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z"/>
          </svg>
        )}
        Continue with Google
      </button>
      {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
    </>
  );
}
