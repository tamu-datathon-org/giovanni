import { auth } from "@vanni/auth";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "~/components/ui/navigation-menu"

const OrganizerNavBar = () => {
    const authUser = auth();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/organizer" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/organizer/applications" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Applications</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default OrganizerNavBar;