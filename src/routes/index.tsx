import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "FitTrack — Track your workouts" },
      {
        name: "description",
        content: "FitTrack: log workouts, training time and calories burned. Log in to continue.",
      },
      { property: "og:title", content: "FitTrack — Track your workouts" },
      {
        property: "og:description",
        content: "FitTrack: log workouts, training time and calories burned. Log in to continue.",
      },
    ],
  }),
  component: IndexRedirect,
});

function IndexRedirect() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    navigate({ to: user ? "/dashboard" : "/login", replace: true });
  }, [loading, user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner label="Loading FitTrack…" />
    </div>
  );
}
