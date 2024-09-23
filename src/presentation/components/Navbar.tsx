import { cn } from "@/lib/utils";
import { Link } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 brightness-110 bg-background shadow-md">
      <NavigationMenu>
        <NavigationMenuList
          className={cn("w-svw flex flex-row justify-end flex-wrap px-4")}
        >
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-r-md p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#home"
          >
            <NavigationMenuItem>Home</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-r-md p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#about"
          >
            <NavigationMenuItem>About</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-r-md p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#experience"
          >
            <NavigationMenuItem>Experience</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-r-md p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#skill"
          >
            <NavigationMenuItem>Skill</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-r-md p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#certificate"
          >
            <NavigationMenuItem>Certificates</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-r-md p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#project"
          >
            <NavigationMenuItem>Project</NavigationMenuItem>
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
