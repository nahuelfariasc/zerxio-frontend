import { fetchBanners } from '@/lib/api';
import { Button } from './ui/button';

interface BannerData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default async function CtaBanner() {
  try {
    const banner = await fetchBanners();

    if (!banner) {
      return (
        <section className="banner py-12 bg-primary text-white text-center">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Banner no disponible</h2>
                <p className="mt-2">Error al cargar el contenido del banner</p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="banner relative py-16 overflow-hidden">        
        <div className="container relative z-10">
          <div className="md:p-12 rounded-2xl bg-gradient-to-r p-8 from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-cyan-500/30 backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {banner.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {banner.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <a href={banner.ctaUrl}>
                    {banner.ctaText}
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
    );
  } catch (error) {
    console.error('Error in CtaBanner component:', error);
    return (
      <section className="py-12 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Error al cargar el banner</h2>
              <p className="mt-2">Por favor, inténtalo de nuevo más tarde</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}