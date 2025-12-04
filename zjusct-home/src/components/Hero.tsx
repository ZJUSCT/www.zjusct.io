import { motion } from "framer-motion";
import { SITE_DATA } from "@/data/content";
import { ArrowRight, Terminal, Cpu, Network } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden selection:bg-primary selection:text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 flex flex-col items-center text-center px-2 md:px-4 max-w-6xl"
      >

        <motion.div variants={itemVariants} className="relative flex flex-col items-center w-full mt-2 md:mt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-2 md:mb-6 w-full">
            <img
              src="./assets/zjusct-wide-clear.svg"
              alt="ZJUSCT"
              className="w-full max-w-5xl h-32 object-contain drop-shadow-sm dark:hidden"
            />
            <img
              src="./assets/zjusct-wide-dark-clear.svg"
              alt="ZJUSCT"
              className="w-full max-w-5xl h-32 object-contain drop-shadow-sm hidden dark:block"
            />
          </div>

          <p className="text-xl md:text-3xl font-medium text-muted-foreground tracking-tight max-w-3xl mx-auto mt-0 md:mt-4">
            Infinite Cores, Unlimited Dreams
          </p>
        </motion.div>

        {/* 简介 */}
        <motion.div variants={itemVariants} className="mt-4 md:mt-8 max-w-2xl mx-auto">
          <p className="text-sm md:text-lg text-muted-foreground/80 leading-relaxed">
            We are students from Zhejiang University Supercomputing Team (ZJUSCT), affiliated to College of Computer Science and Technology, ZJU.
          </p>
        </motion.div>

        {/* 按钮组 */}
        <motion.div variants={itemVariants} className="mt-4 md:mt-8 flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="h-11 px-6 md:h-12 md:px-8 rounded-full text-base font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform" asChild>
            <a href="/guideline/">
              Explore Docs <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="h-11 px-6 md:h-12 md:px-8 rounded-full text-base bg-background/50 backdrop-blur-sm border-border/60 hover:bg-secondary/50 hover:scale-105 transition-transform" asChild>
            <a href={SITE_DATA.home.social.github} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </Button>
        </motion.div>

        {/* 底部数据概览 */}
        <motion.div
          variants={itemVariants}
          className="mt-2 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-10 w-full"
        >
          {[
            { label: "Established", value: "2010s", icon: Terminal },
            { label: "Awards Won", value: "30+", icon: TrophyIcon },
            { label: "Research Areas", value: "HPC / AI", icon: Cpu },
            { label: "Community", value: "Open Source", icon: Network },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 group cursor-default">
              <div className="p-3 bg-secondary/50 rounded-2xl group-hover:bg-primary/10 transition-colors">
                <stat.icon size={24} className="text-primary opacity-80" />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// 简单的奖杯图标组件
function TrophyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
