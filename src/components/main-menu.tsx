"use client";

import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";
import { MenuItem } from "@/lib/zod/menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

export function MainMenu({
  menu,
  className,
}: {
  menu: MenuItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      <NavigationMenu>
        <NavigationMenuList>
          {menu.map((item) => {
            return (
              <NavigationMenuItem key={item._key}>
                {item.subItems ? (
                  <NavigationMenuItemWithChildren item={item} />
                ) : (
                  <NavigationMenuItemSingle
                    url={item.href}
                    title={item.label}
                  />
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const NavigationMenuItemWithChildren = ({ item }: { item: MenuItem }) => {
  return (
    <>
      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[300px] grid-cols-1 gap-3 p-4">
          {item.subItems?.map((component) => (
            <ListItem
              key={component._key}
              title={component.label}
              href={component.href}
            >
              {component.label}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </>
  );
};

const NavigationMenuItemSingle = ({
  url,
  title,
}: {
  url: string;
  title: string;
}) => {
  const pathname = usePathname();
  const pathOrigin = pathname.split("/")[1];
  const isActive = pathOrigin === url || pathname === url;
  return (
    <Link href={url} legacyBehavior passHref>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle()}
        active={isActive}
      >
        {title}
      </NavigationMenuLink>
    </Link>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link href={href!} ref={ref} {...props} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});

ListItem.displayName = "ListItem";
