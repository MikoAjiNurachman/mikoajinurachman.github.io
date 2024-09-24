import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Project() {
    const ref = useScrollAnimation()
    return (
      <div
        id="certificate"
        className="w-full h-full flex flex-col justify-center items-center p-4 gap-8"
      >
        <h2 className="w-full text-6xl border-b-4 border-slate-700">
          Projects
        </h2>
        <div ref={ref} className="w-5/6 flex gap-8 items-center flex-wrap transition-opacity duration-1000">
        Soon............
        </div>
      </div>
    );
}
