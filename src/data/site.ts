export const SITE = {
  name: 'Oferta Naturista',
  description:
    'Productos naturales y de bienestar con las mejores ofertas. Pide fácil por WhatsApp.',
  url: 'https://tiendanaturista.com',
  altUrl: 'https://tiendanaturista.co',
  email: 'tiendanaturista@gmail.com',
  // TODO: reemplaza por tu número real, con indicativo de país y sin "+" ni espacios (Colombia = 57)
  whatsapp: '573000000000',
  themeColor: '#2f6b3a',
  // Usuario en redes sociales
  handle: 'tiendanaturista',
  // Si verificaste Search Console por DNS (Cloudflare) déjalo vacío.
  // Si lo verificaste con la etiqueta HTML, pega aquí solo el valor de content="...".
  googleSiteVerification: '',
  // Deja solo las redes que realmente existen: se usan en el pie de página y en los datos
  // estructurados (schema.org "sameAs") que Google lee para asociar tu marca.
  redes: [
    { nombre: 'Instagram', url: 'https://www.instagram.com/tiendanaturista' },
    { nombre: 'Facebook', url: 'https://www.facebook.com/tiendanaturista' },
    { nombre: 'TikTok', url: 'https://www.tiktok.com/@tiendanaturista' },
  ],
};

export function whatsappLink(mensaje: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function formatoCOP(valor: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor);
}
