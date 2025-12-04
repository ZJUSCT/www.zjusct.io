import { useSiteData } from "@/contexts/SiteDataContext";
import { Mail, Github, Twitter, MapPin } from "lucide-react";

export function Contact() {
  const { data } = useSiteData();
  const { home } = data;

  return (
    <footer className="bg-primary text-primary-foreground dark:bg-primary-foreground dark:text-primary pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p className="text-primary-foreground/60 dark:text-primary/60 mt-2">
              {home.role}
            </p>
          </div>

          <div className="flex items-center gap-2 text-primary-foreground/80 dark:text-primary/80">
              <MapPin size={18} />
              <span>Zhejiang University, Hangzhou, China</span>
          </div>
        </div>

        <div className="flex gap-4">
          <a href={`mailto:${home.social.email}`} className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Mail size={24} />
          </a>
          <a href={home.social.twitter} className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Twitter size={24} />
          </a>
          <a href={home.social.github} className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Github size={24} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/40 dark:text-primary/40 gap-4">
        <p>&copy; {new Date().getFullYear()} {home.title}. All rights reserved.</p>
      </div>
    </footer>
  );
}
