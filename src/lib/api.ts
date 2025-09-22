export async function fetchHero() {
    const res = await fetch("http://localhost:1337/api/hero", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // opcional si usás caching incremental
    });
  
    if (!res.ok) throw new Error("Failed to fetch hero content");
  
    const data = await res.json();
    return data.data; // el contenido está en data.data
}

export async function fetchReasons() {
    try {
      const res = await fetch("http://localhost:1337/api/reasons?populate=features", {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
    
      if (!res.ok) {
        const errorText = await res.text();
        // console.error('Error fetching reasons:', res.status, errorText);
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      
      // Validate the response structure
      // Strapi returns data as an array of objects
      if (!data.data || !Array.isArray(data.data)) {
        // console.error('API response missing data array:', data);
        throw new Error("API response missing data array");
      }

      // Obtener el primer item del array
      const firstItem = data.data[0];
      
      if (!firstItem || !firstItem.title || !firstItem.description || !firstItem.features) {
        // console.error('Estructura de datos inválida:', firstItem);
        throw new Error("Estructura de datos inválida");
      }

      // Mapear los features para asegurar que tengan el formato correcto
      // console.log('Features recibidos:', firstItem.features);
      
      const formattedFeatures = firstItem.features.map((feature: any) => {
        // console.log('Procesando feature:', feature);
        return {
          id: feature.id,
          icon: feature.icon || 'Rocket',
          title: feature.title,
          description: feature.description
        };
      });
      
      // console.log('Features formateados:', formattedFeatures);

      // Devolver el objeto formateado
      return {
        id: firstItem.id,
        documentId: firstItem.documentId || firstItem.id.toString(),
        title: firstItem.title,
        description: firstItem.description,
        features: formattedFeatures,
        createdAt: firstItem.createdAt,
        updatedAt: firstItem.updatedAt,
        publishedAt: firstItem.publishedAt
      };
    } catch (error) {
      // console.error('Error in fetchReasons:', error);
      throw error;
    }
}

export async function fetchPlans() {
  try {
    const res = await fetch("http://localhost:1337/api/plans", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      // console.error('Error fetching plans:', res.status, errorText);
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid API response structure');
    }

    return data.data;
  } catch (error) {
    // console.error('Error in fetchPlans:', error);
    throw error;
  }
}

export async function fetchBanners() {
  try {
    const res = await fetch("http://localhost:1337/api/banners", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      // console.error('Error fetching banners:', res.status, errorText);
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      console.error('Invalid API response:', data);
      throw new Error('Invalid API response structure');
    }

    // Devolver el primer banner
    return data.data[0];
  } catch (error) {
    // console.error('Error in fetchBanners:', error);
    throw error;
  }
}

export async function fetchWordPressPlans() {
  try {
    const res = await fetch("http://localhost:1337/api/wordpresses?populate=*", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const { data } = await res.json();
    
    if (!data || !Array.isArray(data) || data.length === 0 || !data[0].wordpress) {
      console.error('Invalid WordPress plans response:', data);
      throw new Error('No WordPress plans found or invalid response structure');
    }

    return data[0].wordpress;
  } catch (error) {
    console.error('Error in fetchWordPressPlans:', error);
    throw error;
  }
}

export async function fetchResellerPlans() {
  try {
    const res = await fetch("http://localhost:1337/api/resellers?populate=*", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const { data } = await res.json();
    
    if (!data || !Array.isArray(data) || data.length === 0 || !data[0].reseller) {
      console.error('Invalid Reseller plans response:', data);
      throw new Error('No Reseller plans found or invalid response structure');
    }

    return data[0].reseller;
  } catch (error) {
    console.error('Error in fetchResellerPlans:', error);
    throw error;
  }
}

export async function fetchCompartidoPlans() {
  try {
    const res = await fetch("http://localhost:1337/api/compartidos?populate=*", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const { data } = await res.json();
    
    if (!data || !Array.isArray(data) || data.length === 0 || !data[0].compartido) {
      console.error('Invalid Compartido plans response:', data);
      throw new Error('No Compartido plans found or invalid response structure');
    }

    return data[0].compartido;
  } catch (error) {
    console.error('Error in fetchCompartidoPlans:', error);
    throw error;
  }
}