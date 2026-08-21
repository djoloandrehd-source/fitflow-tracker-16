import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Activity, Clock, Flame, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { WorkoutCard } from "@/components/WorkoutCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { fetchWorkouts } from "@/lib/workouts";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "FitTrack — Your workout dashboard" },
      {
        name: "description",
        content:
          "FitTrack dashboard: total workouts, training time and calories burned, plus your latest sessions.",
      },
      { property: "og:title", content: "FitTrack — Your workout dashboard" },
      {
        property: "og:description",
        content:
          "FitTrack dashboard: total workouts, training time and calories burned, plus your latest sessions.",
      },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
});

function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["workouts"],
    queryFn: fetchWorkouts,
  });

  const workouts = data ?? [];
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = workouts.reduce((sum, w) => sum + (w.calories ?? 0), 0);
  const recent = workouts.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <section className="hero-gradient surface-card p-6 sm:p-8">
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {user?.email ?? "Athlete"}
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Here's how your training is stacking up. Keep logging sessions to see your progress
            build.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/add-workout">
                <Plus className="mr-1.5 h-4 w-4" />
                Add workout
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/workouts">View all workouts</Link>
            </Button>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Activity className="h-5 w-5 text-primary" />}
            label="Workouts"
            value={isLoading ? "—" : String(workouts.length)}
          />
          <StatCard
            icon={<Clock className="h-5 w-5 text-primary" />}
            label="Total duration"
            value={isLoading ? "—" : `${totalDuration} min`}
          />
          <StatCard
            icon={<Flame className="h-5 w-5 text-primary" />}
            label="Calories burned"
            value={isLoading ? "—" : `${totalCalories} kcal`}
          />
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent workouts</h2>
            <Link to="/workouts" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>

          {isLoading ? <LoadingSpinner label="Loading your workouts…" /> : null}

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

          {!isLoading && !isError && recent.length === 0 ? (
            <EmptyState
              title="No workouts yet"
              description="Add your first session to start tracking duration, calories and progress."
              action={
                <Button asChild>
                  <Link to="/add-workout">Add your first workout</Link>
                </Button>
              }
            />
          ) : null}

          {recent.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
