# FitTrack Companion

Create a complete functional MVP web application called **FitTrack** for tracking personal workouts.

The application should be built with **React** and connected to **Supabase** for authentication and database storage.

## 1. Main goal

FitTrack is a simple workout tracking application where users can register, log in, add their workouts, view their saved workouts, and open the details of an individual workout.

The application should be simple, modern, responsive, and easy to use. Focus on delivering a functional MVP rather than unnecessary advanced features.

## 2. User authentication

Use **Supabase Authentication** with email and password.

Implement:

* User registration

* User login

* User logout

* Persistent login session

* Protected pages for authenticated users

* Redirect unauthenticated users to the Login page

* Redirect authenticated users to the Dashboard

After registration, the user should be able to log in with the same email and password.

Show clear success and error messages for authentication actions.

## 3. Pages and navigation

Create the following pages:

### Home / Dashboard

Route: `/`

The Dashboard should be available only to authenticated users.

Display:

* Welcome message

* Number of workouts

* Total workout duration

* Total calories burned

* List of the user's most recent workouts

* Button to add a new workout

* Button/link to view all workouts

Create a responsive navigation bar containing:

* FitTrack logo/name

* Dashboard

* Workouts

* Add Workout

* Logout

### Login

Route: `/login`

Create a clean login form with:

* Email

* Password

* Login button

* Link to Register

* Error/success messages

### Register

Route: `/register`

Create a registration form with:

* Email

* Password

* Confirm password

* Register button

* Link to Login

Validate that passwords match before registration.

### Add Workout

Route: `/add-workout`

Create a form for adding a workout.

Fields:

* Workout title

* Workout type

* Duration in minutes

* Calories burned

* Date

* Notes

Workout type should be a select/dropdown with options such as:

* Strength

* Cardio

* Running

* Cycling

* Swimming

* Other

When the form is submitted:

1. Validate the input.

2. Get the currently authenticated user's ID from Supabase.

3. Insert the workout into the Supabase database.

4. Show a success message.

5. Redirect the user to the Workouts page.

### Workouts

Route: `/workouts`

Display all workouts belonging to the currently logged-in user.

Fetch the data from Supabase.

Each workout should be displayed as a clean card containing:

* Workout title

* Workout type

* Duration

* Calories

* Date

Make each workout card clickable.

Clicking a workout should open its detail page.

Include a button for adding a new workout.

If the user has no workouts, display a friendly empty-state message and a button to add the first workout.

### Workout Details

Route: `/workouts/:id`

Display the complete information for the selected workout:

* Title

* Type

* Duration

* Calories

* Date

* Notes

* Created date

Only allow the currently authenticated user to view their own workout details.

Add a button to return to the Workouts page.

## 4. Supabase database

Create a Supabase table called:

`workouts`

Use the following fields:

* `id` – UUID primary key, automatically generated

* `user_id` – UUID referencing the authenticated Supabase user

* `title` – text, required

* `type` – text, required

* `duration` – integer, required

* `calories` – integer, optional

* `date` – date, required

* `notes` – text, optional

* `created_at` – timestamp, automatically generated

Make sure every workout is associated with the authenticated user through `user_id`.

## 5. Security

Implement proper Supabase Row Level Security (RLS).

Users must only be able to:

* View their own workouts

* Insert workouts for themselves

* Update their own workouts

* Delete their own workouts

A user must never be able to access another user's workouts.

Use the authenticated Supabase user's ID to enforce these rules.

## 6. UI and design

Create a modern fitness-themed interface.

Use a dark, modern visual style with subtle neon/green accents.

The design should include:

* Clean navigation

* Modern cards

* Rounded corners

* Clear typography

* Good spacing

* Buttons with hover effects

* Form validation states

* Loading states

* Error states

* Empty states

The interface must be fully responsive and work well on:

* Desktop

* Tablet

* Mobile

Do not make the design overly complicated. Keep it professional and suitable for an MVP project.

## 7. UX requirements

Show loading indicators while fetching or submitting data.

Show useful error messages if a Supabase request fails.

Prevent submitting forms with invalid or missing required fields.

After adding a workout successfully, clearly inform the user that the workout was saved.

Handle empty database results gracefully.

Do not expose Supabase secret keys or service-role keys in the frontend.

Use only the public Supabase configuration that is safe for a frontend application.

## 8. React structure

Organize the project cleanly.

Use reusable components where appropriate, for example:

* Navbar

* ProtectedRoute

* WorkoutCard

* WorkoutForm

* LoadingSpinner

* EmptyState

Keep authentication logic and database operations organized and easy to understand.

Use React Router for navigation.

## 9. Important MVP requirement

The application must be genuinely functional, not just a visual mockup.

The following must work end-to-end:

1. User registers.

2. User logs in.

3. User reaches the protected Dashboard.

4. User adds a workout through the form.

5. Workout is saved in Supabase.

6. Workout appears on the Workouts page.

7. User clicks a workout.

8. Workout details are displayed.

9. User can log out.

10. After logout, protected pages cannot be accessed.

11. A different user must not be able to see another user's workouts.

## 10. Code quality

Generate clean, readable and maintainable React code.

Avoid unnecessary features that are not required for this MVP.

Make sure there are no obvious console errors.

Before considering the project complete, verify that all navigation, authentication, Supabase database operations, protected routes, forms, and workout details work correctly.

The final result should look like a polished but simple **Workout Tracking MVP called FitTrack**.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fitflow-tracker-16.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1682de65-1261-4b97-b501-ba3a54422f0e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
