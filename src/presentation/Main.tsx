import useScrollAnimation from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

export default function Main() {
  const ref = useScrollAnimation()
  return (
    <main id="home" className="flex p-10 flex-row justify-center">
      <div ref={ref} className={'flex flex-row transition-opacity duration-1000'}>
        <img src="/assets/me-removebg.png" className={cn("md:max-lg:w-56 md:max-lg:h-56 sm:max-md:w-40 sm:max-md:h-40 max-sm:w-40 max-sm:h-40 w-[30rem] h-[30rem]")} />
        <div className="chat chat-start w-full md:w-3">
          <div className="chat chat-bubble text-2xl w-max h-28 brightness-150">
            Hi, <br /> My name is Miko Aji
          </div>
        </div>
      </div>
    </main>
  );
}
