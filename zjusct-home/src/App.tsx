import { Hero } from "@/components/Hero";
import { Accomplishments } from "@/components/Accomplishments";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { Contact } from "@/components/Contact";
import { SiteDataProvider, useSiteData } from "@/contexts/SiteDataContext";

function MainContent() {
  const { loading } = useSiteData();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">Loading...</div>;
  }

  return (
    <main className="w-full bg-background font-sans text-foreground selection:bg-primary/20">
      <Hero />
      <Accomplishments />
      <Projects />
      <Publications />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <SiteDataProvider>
      <MainContent />
    </SiteDataProvider>
  );
}

export default App;
