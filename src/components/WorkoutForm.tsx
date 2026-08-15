import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WORKOUT_TYPES, type NewWorkout } from "@/lib/workouts";

type Errors = Partial<Record<"title" | "type" | "duration" | "calories" | "date", string>>;

export function WorkoutForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: NewWorkout) => void;
  submitting: boolean;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const next: Errors = {};
    if (!title.trim()) next.title = "Title is required.";
    else if (title.trim().length > 100) next.title = "Keep the title under 100 characters.";
    if (!type) next.type = "Pick a workout type.";
    const durationValue = Number(duration);
    if (!duration.trim()) next.duration = "Duration is required.";
    else if (!Number.isFinite(durationValue) || durationValue <= 0 || durationValue > 1440)
      next.duration = "Enter a duration between 1 and 1440 minutes.";
    if (calories.trim()) {
      const caloriesValue = Number(calories);
      if (!Number.isFinite(caloriesValue) || caloriesValue < 0 || caloriesValue > 20000)
        next.calories = "Enter a valid calorie amount.";
    }
    if (!date) next.date = "Date is required.";
    return next;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSubmit({
      title: title.trim(),
      type,
      duration: Math.round(Number(duration)),
      calories: calories.trim() ? Math.round(Number(calories)) : null,
      date,
      notes: notes.trim() ? notes.trim().slice(0, 1000) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card space-y-5 p-6" noValidate>
      <div className="space-y-2">
        <Label htmlFor="title">Workout title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Morning push session"
          aria-invalid={Boolean(errors.title)}
          maxLength={100}
        />
        {errors.title ? <p className="text-xs text-destructive">{errors.title}</p> : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Workout type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type" aria-invalid={Boolean(errors.type)}>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {WORKOUT_TYPES.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type ? <p className="text-xs text-destructive">{errors.type}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date ? <p className="text-xs text-destructive">{errors.date}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="45"
            aria-invalid={Boolean(errors.duration)}
          />
          {errors.duration ? <p className="text-xs text-destructive">{errors.duration}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="calories">Calories burned (optional)</Label>
          <Input
            id="calories"
            type="number"
            min={0}
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="320"
            aria-invalid={Boolean(errors.calories)}
          />
          {errors.calories ? <p className="text-xs text-destructive">{errors.calories}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How did it feel? Sets, reps, pace…"
          rows={4}
          maxLength={1000}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
        {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Save workout
      </Button>
    </form>
  );
}
