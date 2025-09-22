import { fetchPlans } from '@/lib/api';
import PlanItem, { Plan } from './plan-item';

export default async function Plans() {
  try {
    const plans = await fetchPlans();

    if (!plans || !Array.isArray(plans)) {
      return (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No se pudieron cargar los planes</p>
        </div>
      );
    }

    return (
      <section className="relative py-20 overflow-hidden">     
        <div className="container relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 bg-gradient-to-r">
            Planes de Hosting
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades de hosting
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan: Plan) => (
              <PlanItem key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching plans:', error);
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Error al cargar los planes</p>
      </div>
    );
  }
}