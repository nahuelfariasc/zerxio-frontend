import HeroSection from "@/components/hero"
import Reason from "@/components/reason"
import CtaBanner from "@/components/banner"
import Plans from "@/components/plans"

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <Reason />
      <Plans />
      <CtaBanner />
    </main>
  )
}
