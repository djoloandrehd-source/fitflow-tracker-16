import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { WorkoutCard } from "@/components/WorkoutCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { fetchWorkouts } from "@/lib/workouts";

export const Route = createFileRoute("/workouts/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Your workouts — FitTrack" },
      { name: "description", content: "Browse every workout you have logged in FitTrack." },
      { property: "og:title", content: "Your workouts — FitTrack" },
      {
        property: "og:description",
        content: "Browse every workout you have logged in FitTrack.",
      },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <WorkoutsPage />
    </ProtectedRoute>
  ),
});

function WorkoutsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["workouts"],
    queryFn: fetchWorkouts,
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Your workouts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {data ? `${data.length} logged session${data.length === 1 ? "" : "s"}` : "Loading…"}
            </p>
          </div>
          <Button asChild>
            <Link to="/add-workout">
              <Plus className="mr-1.5 h-4 w-4" />
              Add workout
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          {isLoading ? <LoadingSpinner label="Loading workouts…" /> : null}

          {isError ? (
            <div className="surface-card space-y-3 p-6 text-center">
              <p className="text-sm text-destructive">
                {(error as Error).message || "Something went wrong loading your workouts."}
              </p>
              <Button variant="outline" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          ) : null}

          {data && data.length === 0 ? (
            <EmptyState
              title="No workouts yet"
              description="Log your first session and FitTrack will start building your history."
              action={
                <Button asChild>
                  <Link to="/add-workout">Add your first workout</Link>
                </Button>
              }
            />
          ) : null}

          {data && data.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
