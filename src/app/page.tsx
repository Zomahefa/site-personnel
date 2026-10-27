import { Hero } from "@/components/site/hero";
import { StackMarquee } from "@/components/site/stack-marquee";
import { SelectedWork } from "@/components/site/selected-work";
import { Capabilities } from "@/components/site/capabilities";
import { Process } from "@/components/site/process";
import { Pipeline } from "@/components/site/pipeline";
import { About } from "@/components/site/about";
import { Testimonials } from "@/components/site/testimonials";
import { ContactSection } from "@/components/site/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <SelectedWork />
      <Capabilities />
      <Process />
      <Pipeline />
      <About />
      <Testimonials />
      <ContactSection />
    </>
  );
}
