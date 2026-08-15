import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Clock, Flame } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { fetchWorkout, formatDate } from "@/lib/workouts";

export const Route = createFileRoute("/workouts/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Workout details — FitTrack" },
      { name: "description", content: "See the full details of one of your logged workouts." },
      { property: "og:title", content: "Workout details — FitTrack" },
      {
        property: "og:description",
        content: "See the full details of one of your logged workouts.",
      },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <WorkoutDetailPage />
    </ProtectedRoute>
  ),
});

function WorkoutDetailPage() {
  const { id } = Route.useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workouts", id],
    queryFn: () => fetchWorkout(id),
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
          <Link to="/workouts">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to workouts
          </Link>
        </Button>

        {isLoading ? <LoadingSpinner label="Loading workout…" /> : null}

        {isError ? (
          <p className="surface-card p-6 text-sm text-destructive">
            {(error as Error).message || "Could not load this workout."}
          </p>
        ) : null}

        {!isLoading && !isError && !data ? (
          <div className="surface-card space-y-3 p-8 text-center">
            <h1 className="text-lg font-semibold">Workout not found</h1>
            <p className="text-sm text-muted-foreground">
              This workout doesn't exist, or it doesn't belong to your account.
            </p>
          </div>
        ) : null}

        {data ? (
          <article className="surface-card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
                {data.type}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Stat icon={<Clock className="h-4 w-4" />} label="Duration" value={`${data.duration} min`} />
              <Stat
                icon={<Flame className="h-4 w-4" />}
                label="Calories"
                value={`${data.calories ?? 0} kcal`}
              />
              <Stat
                icon={<CalendarDays className="h-4 w-4" />}
                label="Date"
                value={formatDate(data.date)}
              />
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-semibold text-muted-foreground">Notes</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm">
                {data.notes?.trim() ? data.notes : "No notes for this workout."}
              </p>
            </div>

            <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
              Created {new Date(data.created_at).toLocaleString()}
            </p>
          </article>
        ) : null}
      </main>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
