import { Studio } from "./studio";

// Ensures the Studio route is statically generated
export const dynamic = "force-static";

export default function StudioPage() {
  return <Studio />;
}
