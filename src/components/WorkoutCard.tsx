import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, Flame } from "lucide-react";
import { formatDate, type Workout } from "@/lib/workouts";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      to="/workouts/$id"
      params={{ id: workout.id }}
      className="surface-card group block p-5 transition-all hover:-translate-y-0.5 hover:glow"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold group-hover:text-primary">{workout.title}</h3>
        <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-primary">
          {workout.type}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {workout.duration} min
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Flame className="h-4 w-4" /> {workout.calories ?? 0} kcal
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4" /> {formatDate(workout.date)}
        </span>
      </div>
    </Link>
  );
}
