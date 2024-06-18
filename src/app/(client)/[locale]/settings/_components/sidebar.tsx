import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Link } from "@/navigation";

const sidebarItems = [
  { id: 1, href: "/settings", label: "Profile" },
  { id: 2, href: "/settings/messages", label: "Messages" },
];

export default function Sidebar() {
  return (
    <div className="px-2">
      <Command>
        <CommandList>
          {sidebarItems.map(({ href, label, id }) => (
            <Link href={href} key={id} className="group">
              <CommandItem className="cursor-pointer group-hover:underline">
                {label}
              </CommandItem>
            </Link>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
