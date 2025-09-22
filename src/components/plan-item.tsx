import { cn } from "@/lib/utils";
import { Rocket, ShieldCheck, Server, Headset, Users, Workflow, CheckCircle } from 'lucide-react';

export interface Plan {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  ShieldCheck,
  Server,
  Headset,
  Users,
  Workflow,
};

const getIconComponent = (iconName: string) => {
  const IconComponent = iconComponents[iconName];
  if (!IconComponent) return null;
  return <IconComponent className="w-full h-full text-cyan-400" />;
};

interface PlanItemProps {
  plan: Plan;
}

export default function PlanItem({ plan }: PlanItemProps) {
  const features = plan.description.split('\n').filter(line => line.trim() !== '');
  
  return (
    <div 
      className={cn(
        "relative p-8 rounded-xl border border-cyan-400/20 bg-slate-900/80 backdrop-blur-sm",
        "transition-all duration-500 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10",
        "flex flex-col h-full"
      )}
    >
      <div className="w-16 h-16 mx-auto mb-6 p-3 bg-cyan-400/10 rounded-lg backdrop-blur-sm hover:bg-cyan-400/20 transition-colors duration-300">
        {getIconComponent(plan.icon)}
      </div>
      <h3 className="text-muted-foreground text-2xl font-bold mb-2 text-cyan-400 text-center">{plan.name}</h3>
      <div className="text-muted-foreground text-center mb-6">
        {plan.description}
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-left">{feature.trim()}</span>
          </li>
        ))}
      </ul>  
      <a href={`/${plan.slug}`} className="btn-primary font-medium py-3 px-6 rounded-lg cursor-pointer">
        Ver Planes
      </a>
    </div>
  );
}