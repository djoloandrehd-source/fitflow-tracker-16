import { supabase } from "@/integrations/supabase/client";

export const WORKOUT_TYPES = [
  "Strength",
  "Cardio",
  "Running",
  "Cycling",
  "Swimming",
  "Other",
] as const;

export type Workout = {
  id: string;
  user_id: string;
  title: string;
  type: string;
  duration: number;
  calories: number | null;
  date: string;
  notes: string | null;
  created_at: string;
};

export async function fetchWorkouts(): Promise<Workout[]> {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Workout[];
}

export async function fetchWorkout(id: string): Promise<Workout | null> {
  const { data, error } = await supabase.from("workouts").select("*").eq("id", id).maybeSingle();

  if (error) throw new Error(error.message);
  return (data as Workout | null) ?? null;
}

export type NewWorkout = {
  title: string;
  type: string;
  duration: number;
  calories: number | null;
  date: string;
  notes: string | null;
};

export async function createWorkout(input: NewWorkout, userId: string): Promise<Workout> {
  const { data, error } = await supabase
    .from("workouts")
    .insert({ ...input, user_id: userId })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Workout;
}

export function formatDate(value: string) {
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
