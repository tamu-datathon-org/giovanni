"use client";

import Link from "next/link";

import { Button } from "@vanni/ui/button";

import { useOrganizerEvent } from "~/app/_components/organizer/event-selection";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { signOutAction } from "../auth/signOutAction";

const OrganizerNavBar = () => {
  const { eventName, setEventName, events, isLoading } = useOrganizerEvent();

  return (
    <NavigationMenu className="mx-auto w-full pb-8 ">
      <NavigationMenuList className="flex-row flex-wrap gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/organizer">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/organizer/applications">Applications</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/organizer/passport">Passport</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/organizer/analytics">Analytics</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/organizer/email-generator">Email Generator</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Select
            value={eventName}
            onValueChange={setEventName}
            disabled={isLoading || events.length === 0}
          >
            <SelectTrigger className="h-9 w-[200px] border-neutral-600 bg-neutral-900 text-white">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.name}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <form action={signOutAction.bind(null, "/organizer")}>
            <Button variant="ghost" type="submit">
              Signout
            </Button>
          </form>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default OrganizerNavBar;
