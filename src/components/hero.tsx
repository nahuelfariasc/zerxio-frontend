import { fetchHero } from "@/lib/api"
import FloatingData from "./floating-data"
import HeroEffect from "./hero-effect"

export default async function HeroSection() {
  const data = await fetchHero()

  if (!data) return null

  return (
    <section className="hero min-h-[60vh] relative flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-blue-900/20 via-slate-900/20 to-slate-900">
      <FloatingData />
      <HeroEffect />
      <h1 className="container text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono tracking-wide text-center z-1">{data.title}</h1>
      <div
        className="container text-xl text-muted-foreground max-w-2xl mx-auto text-center z-1"
        dangerouslySetInnerHTML={{ __html: data.subtitle }}
      />
      {data.cta && (
        <a
          href={data.cta_url}
          className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-md"
        >
          {data.cta_text}
        </a>
      )}
    </section>
  )
}