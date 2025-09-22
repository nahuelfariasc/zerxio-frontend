import * as LucideIcons from 'lucide-react';
import { fetchReasons } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Feature {
  id: number;
  icon: keyof typeof IconMap;
  title: string;
  text: string;
  description: string;
}

interface ReasonData {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  features: Feature[];
}

const IconMap = {
  Rocket: LucideIcons.Rocket,
  ShieldCheck: LucideIcons.ShieldCheck,
  Server: LucideIcons.Server,
  Headset: LucideIcons.Headset,
  Globe: LucideIcons.Globe,
  CircleCheckBig: LucideIcons.CircleCheckBig,
} as const;

type IconName = keyof typeof IconMap;

const getIconComponent = (iconName: IconName) => {
  return IconMap[iconName];
};

const Reason = async () => {
  try {
    const reason = await fetchReasons() as ReasonData;

    if (!reason?.title || !reason.description || !reason.features?.length) {
      console.error('Invalid reason data:', reason);
      return (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Error en la estructura de datos</p>
        </div>
      );
    }

    return (
      <section className="reason relative py-20">
        <div className="container">
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text bg-gradient-to-r from-primary to-accent">
              {reason.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-16">
              {reason.description}
            </p>            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {reason.features.map((feature, idx) => {
                const Icon = getIconComponent(feature.icon);
                if (!Icon) {
                  console.error('Invalid icon:', feature.icon);
                  return null;
                }
                
                return (
                  <div 
                    key={feature.id || idx}
                    className={cn(
                      "relative p-8 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-cyan-400/40",
                      "transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:glow",
                      "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-cyan-400/10 before:to-transparent before:opacity-0 hover:before:opacity-100",
                      "after:absolute after:inset-0 after:rounded-lg after:bg-[radial-gradient(circle_at_center,theme(colors.cyan.400/10),transparent_70%)] after:opacity-10 hover:after:opacity-70",
                      "overflow-hidden group",
                      "animate-fade-in"
                    )}
                    style={{
                      '--tw-animate-delay': `${idx * 0.1}s`,
                    } as React.CSSProperties}
                  >
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-6 p-3 bg-primary/10 rounded-lg backdrop-blur-sm group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-full h-full text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-center text-foreground group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-center group-hover:text-foreground/90 transition-colors duration-300">
                        {feature.text}
                      </p>
                      <div className="flex justify-center">
                        {feature.description}
                      </div>
                      
                      {/* Animated line below text */}
                      <div className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/70 transition-all duration-500 w-1/2 mx-auto" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error in Reason component:', error);
    return (
      <div className="text-center py-16">
        <p className="text-destructive">Error al cargar los datos</p>
      </div>
    );
  }
};

export default Reason;