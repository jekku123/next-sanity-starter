import { MenuItem } from "@/lib/zod/menu";

export default function Footer({ menu }: { menu: MenuItem[] }) {
  return (
    <footer className="z-50 w-full">
      <div className="mx-auto w-full max-w-7xl px-6 py-4">Footer</div>
    </footer>
  );
}
