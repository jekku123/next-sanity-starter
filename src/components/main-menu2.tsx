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

export function MainMenu2({
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
      <NavigationMenuTrigger>
        <Link href={item.href} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {item.label}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          {item.subItems!.map((component) => (
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
  return (
    <Link href={url} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
            "hover:bg-primary-100 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
        >
          <h2 className="scroll-m-20 text-xl font-bold text-secondary-foreground">
            {title}
          </h2>
          <p className="line-clamp-2 text-foreground">{children}</p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});

ListItem.displayName = "ListItem";
