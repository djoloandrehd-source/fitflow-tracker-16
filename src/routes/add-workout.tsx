import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { WorkoutForm } from "@/components/WorkoutForm";
import { createWorkout, type NewWorkout } from "@/lib/workouts";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/add-workout")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Add a workout — FitTrack" },
      {
        name: "description",
        content: "Log a new workout with type, duration, calories, date and notes.",
      },
      { property: "og:title", content: "Add a workout — FitTrack" },
      {
        property: "og:description",
        content: "Log a new workout with type, duration, calories, date and notes.",
      },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <AddWorkoutPage />
    </ProtectedRoute>
  ),
});

function AddWorkoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: NewWorkout) => createWorkout(values, user!.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workouts"] });
      toast.success("Workout saved!");
      navigate({ to: "/workouts" });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Could not save the workout.");
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Add a workout</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Log the session while it's still fresh.
        </p>

        {mutation.isError ? (
          <p className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {(mutation.error as Error).message}
          </p>
        ) : null}

        <div className="mt-6">
          <WorkoutForm onSubmit={(values) => mutation.mutate(values)} submitting={mutation.isPending} />
        </div>
      </main>
    </div>
  );
}
