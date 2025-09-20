// Función para formatear precio
export const formatPrice = (price: number, currency: string): string => {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
};

// Función para obtener imagen por defecto
export const getDefaultImage = (category: string): string => {
  const defaultImages: { [key: string]: string } = {
    'Desarrollo Web': 'https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY4NDgzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Desarrollo Móvil': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY3OTA1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Consultoría': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0aW5nJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU2Nzg0NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'Marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBkaWdpdGFsfGVufDF8fHx8MTc1Njc4NDQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Soporte': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwb3J0JTIwdGVjaG5pY2FsfGVufDF8fHx8MTc1Njc4NDQyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
  };
  return defaultImages[category] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBjaGFydHN8ZW58MXx8fHwxNzU2Nzg0NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080';
};
