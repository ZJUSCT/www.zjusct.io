import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SITE_DATA } from "@/data/content";

export function Accomplishments() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 10,
    stiffness: 100,
    mass: 0.2
  });

  useEffect(() => {
    const updateScrollRange = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(Math.max(0, scrollWidth - viewportWidth));
      }
    };

    updateScrollRange();
    setTimeout(updateScrollRange, 100);

    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, []);

  const x = useTransform(smoothProgress, [0.02, 0.98], [0, -scrollRange]);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <div className="absolute left-8 top-32 md:left-20 md:top-48 z-20 pointer-events-none">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Accomplishments</h2>
        </div>

        <motion.div 
          ref={containerRef}
          style={{ x }} 
          className="flex items-center h-full relative pr-12 md:pr-24 mt-12 md:mt-16"
        >
          <div className="w-[10vw] md:w-[20vw] flex-shrink-0" />

          <div className="absolute top-1/2 left-0 right-0 h-px bg-border -z-10" />

          <div className="flex items-center">
            {SITE_DATA.accomplishments.map((item, index) => {
              const isTop = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className="relative flex-shrink-0 w-[300px] md:w-[400px] h-[400px] flex flex-col justify-center items-center group"
                >
                  <div className="flex-1 flex flex-col justify-end items-center w-full pb-0">
                    {isTop && (
                      <div className="flex flex-col items-center w-full">
                        <div className="mb-6 px-4 text-center transition-transform duration-500 group-hover:-translate-y-2">
                          <span className="inline-block mb-3 text-xs font-bold font-mono text-primary/60 tracking-wider">
                            {item.date}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold leading-tight text-foreground">
                            {item.title}
                          </h3>
                        </div>
                        <div className="w-px h-16 bg-border group-hover:bg-primary/50 transition-colors duration-300" />
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 w-3 h-3 rounded-full bg-background border-2 border-primary ring-4 ring-background group-hover:scale-150 transition-transform duration-300 shadow-sm" />

                  <div className="flex-1 flex flex-col justify-start items-center w-full pt-0">
                    {!isTop && (
                      <div className="flex flex-col items-center w-full">
                        <div className="w-px h-16 bg-border group-hover:bg-primary/50 transition-colors duration-300" />
                        <div className="mt-6 px-4 text-center transition-transform duration-500 group-hover:translate-y-2">
                           <h3 className="text-xl md:text-2xl font-bold leading-tight text-foreground mb-3">
                            {item.title}
                          </h3>
                          <span className="inline-block text-xs font-bold font-mono text-primary/60 tracking-wider">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[10vw] md:w-[10vw] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}