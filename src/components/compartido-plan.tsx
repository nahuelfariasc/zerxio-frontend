import { cn } from "@/lib/utils";
import { CheckCircle } from 'lucide-react';

interface CompartidoPlanProps {
  title: string;
  description: string;
  cost: number;
  features: string;
  link: string;
  isPopular?: boolean;
}

export function CompartidoPlan({ 
  title, 
  description, 
  cost, 
  features,
  link,
  isPopular = false
}: CompartidoPlanProps) {
  // Parsear el texto enriquecido a un array de características
  const featureList = features
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return (
    <div 
    className={cn(
      "relative p-8 rounded-xl border border-cyan-400/20 bg-slate-900/80 backdrop-blur-sm",
      "transition-all duration-500 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10",
      "flex flex-col h-full"
    )}
    >
      {/* {isPopular && (
        <div className="bg-blue-500 text-white text-sm font-medium py-1 px-4 text-center">
          Más popular
        </div>
      )} */}
      
      <div>
        <h3 className="text-2xl font-bold mb-2 text-cyan-400">{title}</h3>
        <p className="mb-6">{description}</p>
        
        <div className="mb-6 text-muted-foreground">
          <span className="text-3xl text-muted-foreground font-bold text-cyan-400">${cost}</span>
          <span>/mes</span>
        </div>
        
        <ul className="space-y-3 mb-8 flex-grow">
          {featureList.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature.trim()}</span>
            </li>
          ))}
        </ul>
        
        <a href={link} target="_blank" className="btn-primary font-medium py-3 px-6 rounded-lg cursor-pointer">
          Contratar ahora
        </a>
      </div>
    </div>
  );
}
