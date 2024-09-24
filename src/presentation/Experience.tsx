import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Experience() {
    const ref = useScrollAnimation()

  return (
    <div
      id="experience"
      className="w-full h-full flex flex-col justify-center items-center p-4 gap-8"
    >
      <h2 className="w-full text-6xl border-b-4 border-slate-700">
        Experience
      </h2>
      <ul ref={ref} className="w-5/6 flex gap-8 items-center flex-wrap transition-opacity duration-1000">
        <li className="w-full h-full flex flex-row gap-12 items-center">
          <span className="h-full">
            <h3 className="text-md">Software Engineer</h3>
            <p className="text-xl font-semibold">
              PT. Paramadaksa Teknologi Nusantara, 2020 - Present
            </p>
            <p>
              - Worked on various FMCG projects, including web applications,
              microservices.
            </p>
            <p>
              - Utilized technologies like ReactJS, Go, Docker, Elastic, Redis,
              WebSocket, and K8s.
            </p>
          </span>
          <img src="/assets/nexsoft-logo.png" className="w-1/3 h-1/3" alt="" />
        </li>
      </ul>
    </div>
  );
}
