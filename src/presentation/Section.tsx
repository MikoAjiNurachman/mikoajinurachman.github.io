import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function Section() {
  const ref = useScrollAnimation()

  return (
    <section id="about" className="w-full h-full flex flex-col justify-center items-center p-4 gap-8">
      <h2 className="w-full text-6xl border-b-4 border-slate-700">About Me</h2>
      <span className="text-base flex flex-row gap-12 items-center w-5/6 transition-opacity duration-1000" ref={ref}>
        <p className="text-lg">
          I am a seasoned Software Engineer with over 4 years of experience in
          developing robust software solutions. My expertise spans across a
          diverse range of technologies, including Go (Golang), React.js, and
          Docker. I am also well-versed in container orchestration tools such as
          Kubernetes, which allows me to build scalable and efficient
          applications.
        </p>
        <p className="mt-12 text-lg">
          My technical skill set includes working with Redis, Elasticsearch, and
          RabbitMQ to enhance system performance and reliability. Additionally,
          I have a strong background in using PostgreSQL for database management
          and developing Android applications with Kotlin and Jetpack Compose,
          which helps me create intuitive and responsive user interfaces.
        </p>
      </span>
    </section>
  );
}
