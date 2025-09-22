import { Button } from "@/components/ui/button";
import { ResellerPlan } from "@/components/reseller-plan";
import { fetchResellerPlans } from "@/lib/api";

interface ResellerPlanData {
  id: number;
  title: string;
  description: string;
  cost: number;
  list: string;
  link: string;
}

export default async function Page() {
  try {
    const resellerPlans = await fetchResellerPlans();

    if (resellerPlans.length === 0) {
      return (
        <section className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Hosting Reseller</h1>
          <p className="text-xl text-gray-600">
            No hay planes Reseller disponibles en este momento.
          </p>
        </section>
      );
    }

    return (
      <>
      <section className="hero min-h-[40vh] relative flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-blue-900/20 via-slate-900/20 to-slate-900">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono tracking-wide z-1">Hosting Reseller</h1>
        <div className="text-xl text-muted-foreground max-w-2xl mx-auto text-center z-1">
            Ideal para agencias y desarrolladores que quieren ofrecer hosting a sus clientes con cuentas cPanel independientes.
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(resellerPlans as ResellerPlanData[]).map((plan: ResellerPlanData, index: number) => (
              <ResellerPlan
                key={plan.id}
                title={plan.title}
                description={plan.description}
                cost={plan.cost}
                features={plan.list}
                isPopular={index === 1} // Marcar el segundo plan como popular
                link={plan.link}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="banner relative py-16 overflow-hidden">        
        <div className="container relative z-10">
          <div className="md:p-12 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-cyan-500/30 backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                ¿Necesitas Ayuda para Elegir?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nuestro equipo de expertos está aquí para ayudarte a encontrar el plan perfecto para tu proyecto              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <a href="/contacto">
                    Contactate con nosotros
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div 
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.366.366c-1.049 1.05-1.866 2.153-2.746 3.26-.95 1.186-1.932 2.41-3.05 3.54l-.12.126c-1.186 1.187-2.41 2.1-3.54 3.05-1.186.95-2.41 1.795-3.54 2.745-.95 1.05-1.86 2.15-2.746 3.26-.95 1.186-1.795 2.41-2.745 3.54-1.05.95-2.15 1.86-3.26 2.745-1.186.95-2.41 1.795-3.54 2.745-1.05.95-2.15 1.86-3.26 2.746-1.186.95-2.41 1.794-3.54 2.744-1.05 1.05-2.15 1.86-3.26 2.746-1.186.95-2.41 1.794-3.54 2.745-1.05.95-2.15 1.86-3.26 2.745-1.186.95-2.41 1.795-3.54 2.745-.95 1.05-2.15 1.86-3.26 2.746-1.186.95-2.41 1.795-3.54 2.745-.95 1.05-2.15 1.86-3.26 2.746-1.186.95-2.41 1.795-3.54 2.745-.95 1.05-2.15 1.86-3.26 2.745-1.186.95-2.41 1.795-3.54 2.745-.95 1.05-2.15 1.86-3.26 2.746C5.8 58.205 4.575 59.05 3.445 60H0V0h54.627z\' fill=\'%2300ffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                  backgroundSize: '60px 60px',
                  opacity: 0.2
                }}
              />
            </div>
          </div>
        </div>
      </section>
      </>
    );
  } catch (error) {
    console.error('Error loading WordPress plans:', error);
    return (
      <section className="py-12 mt-12">
        <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Hosting WordPress</h1>
        <p className="text-xl text-red-500">
          Error al cargar los planes. Por favor, intente nuevamente más tarde.
        </p>
        <p className="text-gray-500 mt-2">
          Asegúrese de que el servidor backend esté en ejecución.
        </p>
        </div>
      </section>
    );
  }
}