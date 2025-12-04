import { SITE_DATA } from "@/data/content";
import { BookOpen, ExternalLink, Quote } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Publications() {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Publications</h2>
        </div>
        
        <div className="grid gap-6">
          {SITE_DATA.publications.map((pub) => (
            <Card key={pub.id} className="group border-border/60 hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row gap-4 items-start pb-2">
                 <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-lg bg-secondary items-center justify-center text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <BookOpen size={20} />
                 </div>
                 <div className="space-y-1 w-full">
                    <div className="flex flex-wrap justify-between gap-2 items-start">
                        <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                            {pub.title}
                        </CardTitle>
                        <Badge variant="outline" className="font-mono whitespace-nowrap">
                            {pub.date}
                        </Badge>
                    </div>
                    <div className="text-sm text-foreground/80 leading-relaxed">
                        {pub.authors.map((author, i) => (
                          <span key={i} className={author.includes("ZJUSCT") ? "font-semibold text-foreground" : ""}>
                            {author}{i < pub.authors.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </div>
                 </div>
              </CardHeader>
              
              <CardContent className="pl-6 md:pl-[5.5rem]">
                <div className="flex items-center gap-2 mb-3 text-sm font-medium text-primary">
                    <Quote size={14} className="rotate-180" />
                    <span>{pub.publication}</span>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {pub.abstract}
                </p>

                {pub.doi && (
                  <Button variant="ghost" size="sm" className="h-8 -ml-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                    <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} className="mr-1" />
                      View DOI: {pub.doi}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}