import { redirect } from "next/navigation";

// The Recipe Database (recipes-database) is the single real recipe surface.
// This legacy route now redirects there so any stale links keep working.
export default function RecipesPage() {
  redirect("/recipes-database");
}
