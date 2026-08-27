import { redirect } from "next/navigation";

// Root redirects to the flagship PRIME property. Future properties live at
// /<location> via the reusable template.
export default function Home() {
  redirect("/hosagunda");
}
