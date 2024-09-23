import useScrollAnimation from "@/hooks/useScrollAnimation";
import ImageTooltip from "./components/ImageTooltip";


export default function Skill() {
  const ref = useScrollAnimation()
  return (
    <div
      id="skill"
      className="w-full h-full flex flex-col justify-center items-center p-4 gap-8"
    >
      <h2 className="w-full text-6xl border-b-4 border-slate-700">
        Skills
      </h2>
      <div ref={ref} className="w-5/6 flex gap-8 items-center flex-wrap transition-opacity duration-1000">
        <ImageTooltip src="src/assets/golang-logo.png" tooltip="Golang"/>
        <ImageTooltip src="src/assets/docker-logo.png" tooltip="Docker"/>
        <ImageTooltip src="src/assets/postgres-logo.png" tooltip="Postgres"/>
        <ImageTooltip src="src/assets/elastic-logo.png" tooltip="Elastic"/>
        <ImageTooltip src="src/assets/redis.png" tooltip="Redis"/>
        <ImageTooltip className="bg-slate-200 rounded-full" src="src/assets/git-logo.png" tooltip="Git"/>
        <ImageTooltip src="src/assets/html-logo.png" tooltip="HTML"/>
        <ImageTooltip src="src/assets/js-logo.png" tooltip="JS"/>
        <ImageTooltip src="src/assets/css-logo.png" tooltip="CSS"/>
        <ImageTooltip src="src/assets/react-logo.png" tooltip="React"/>
        <ImageTooltip src="src/assets/kubernetes-logo.png" tooltip="Kubernetes"/>
      </div>
    </div>
  );
}
