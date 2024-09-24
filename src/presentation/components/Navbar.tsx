import { cn } from "@/lib/utils";
import { Link } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { LayoutGrid } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 w-full max-nigger:p-4 transition-all duration-300 bg-background shadow-md">
      <Sheet key="left">
        <SheetTrigger asChild>
          <LayoutGrid
            className={cn(
              "fill-black w-16 h-16 justify-self-start max-nigger:flex hidden cursor-pointer hover:fill-slate-400 hover:opacity-6"
            )}
          />
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
          <SheetHeader>
            <NavigationMenu>
              <NavigationMenuList
                className={cn(
                  "w-full flex flex-col justify-end flex-wrap mt-4"
                )}
              >
                <SheetClose                   className={cn(
                    "hover:bg-slate-500 hover:rounded-xl p-4 w-full text-xl font-bold text-center h-full cursor-pointer"
                  )}>
                <Link className={cn('w-full h-full')}
                  href="#home"
                >
                    <NavigationMenuItem>Home</NavigationMenuItem>
                </Link>
                  </SheetClose>
                <SheetClose                   className={cn(
                    "hover:bg-slate-500 hover:rounded-xl p-4 w-full text-xl font-bold text-center h-full cursor-pointer"
                  )}>
                <Link className={cn('w-full h-full')}
                  href="#about"
                >
                    <NavigationMenuItem>About</NavigationMenuItem>
                </Link>
                  </SheetClose>
                <SheetClose                   className={cn(
                    "hover:bg-slate-500 hover:rounded-xl p-4 w-full text-xl font-bold text-center h-full cursor-pointer"
                  )}>
                <Link className={cn('w-full h-full')}
                  href="#experience"
                >
                    <NavigationMenuItem>Experience</NavigationMenuItem>
                </Link>
                  </SheetClose>
                <SheetClose                   className={cn(
                    "hover:bg-slate-500 hover:rounded-xl p-4 w-full text-xl font-bold text-center h-full cursor-pointer"
                  )}>
                <Link className={cn('w-full h-full')}
                  href="#skill"
                >
                    <NavigationMenuItem>Skill</NavigationMenuItem>
                </Link>
                  </SheetClose>
                <SheetClose                   className={cn(
                    "hover:bg-slate-500 hover:rounded-xl p-4 w-full text-xl font-bold text-center h-full cursor-pointer"
                  )}>
                <Link className={cn('w-full h-full')}
                  href="#certificate"
                >
                    <NavigationMenuItem>Certificates</NavigationMenuItem>
                </Link>
                  </SheetClose>
                <SheetClose                   className={cn(
                    "hover:bg-slate-500 hover:rounded-xl p-4 w-full text-xl font-bold text-center h-full cursor-pointer"
                  )}>
                <Link className={cn('w-full h-full')}
                  href="#project"
                >
                    <NavigationMenuItem>Project</NavigationMenuItem>
                </Link>
                  </SheetClose>
              </NavigationMenuList>
            </NavigationMenu>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <NavigationMenu className={cn("max-w-full flex justify-end")}>
        <NavigationMenuList
          className={cn(
            "w-full flex flex-row justify-self-end flex-wrap px-4 max-nigger:hidden"
          )}
        >
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-xl p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#home"
          >
            <NavigationMenuItem>Home</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-xl p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#about"
          >
            <NavigationMenuItem>About</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-xl p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#experience"
          >
            <NavigationMenuItem>Experience</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-xl p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#skill"
          >
            <NavigationMenuItem>Skill</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-xl p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
            )}
            href="#certificate"
          >
            <NavigationMenuItem>Certificates</NavigationMenuItem>
          </Link>
          <Link
            className={cn(
              "hover:bg-slate-500 hover:rounded-xl p-4 w-32 text-xl font-bold text-center h-full cursor-pointer"
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
