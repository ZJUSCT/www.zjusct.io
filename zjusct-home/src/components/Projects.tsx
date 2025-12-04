import { motion } from "framer-motion";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Github, ExternalLink } from "lucide-react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Projects() {
  const { data } = useSiteData();

  return (
    <section className="py-32 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="h-full flex flex-col overflow-hidden border-border/60 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => {
                  if (project.links.length > 0) {
                     window.open(project.links[0].url, "_blank");
                  }
                }}
              >
                <CardHeader className="pb-2 mb-4">
                  <div className="flex gap-4 items-center">

                    <img
                      src={project.icon}
                      alt={project.title}
                      className="w-12 h-12 object-contain rounded-md"
                    />

                    <div className="flex-1 flex flex-col">

                      <div className="flex flex-col md:flex-row justify-between items-start">
                        <CardTitle className="text-2xl">{project.title}</CardTitle>

                        <div className="flex gap-2 flex-wrap justify-start md:justify-end mt-2 md:mt-0">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mt-2">
                        {project.description}
                      </p>
                    </div>

                  </div>
                </CardHeader>

                <CardFooter className="flex flex-wrap gap-3 pt-6 border-t bg-secondary/5 mt-auto">
                  {project.links.map((link, index) => (
                    <Button
                      key={link.name}
                      className="
                        dark:bg-background dark:border dark:border-input dark:text-foreground dark:shadow-sm
                      "
                      variant={
                        index === 0
                          ? "default"
                          : link.name.toLowerCase().includes("code")
                          ? "outline"
                          : "default"
                      }
                      size="sm"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        {link.name.toLowerCase().includes("code") ? (
                          <Github size={16} />
                        ) : (
                          <ExternalLink size={16} />
                        )}
                        {link.name}
                      </a>
                    </Button>
                  ))}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
