// Optimización: Lazy loading para imágenes
export function lazyLoadImage(img, src) {
  return new Promise((resolve) => {
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      resolve();
    };
    tempImg.onerror = () => {
      img.src = '/api/placeholder/100/100';
      img.classList.add('loaded');
      resolve();
    };
    tempImg.src = src;
  });
}

// Optimización: Debounce para eventos
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
} 