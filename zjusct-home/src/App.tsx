import { Hero } from "@/components/Hero";
import { Accomplishments } from "@/components/Accomplishments";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { Contact } from "@/components/Contact";

function App() {
  return (
    <>
      <main className="w-full bg-background font-sans text-foreground selection:bg-primary/20">
        <Hero />
        <Accomplishments />
        <Projects />
        <Publications />
        <Contact />
      </main>
    </>
  );
}

export default App;