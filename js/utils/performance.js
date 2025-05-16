/**
 * Debounce para optimizar eventos que se disparan con frecuencia
 * @param {Function} func - Función a ejecutar después del tiempo de espera
 * @param {number} wait - Tiempo de espera en milisegundos
 * @returns {Function} Función con debounce aplicado
 */
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

/**
 * Limpia los recursos de video cuando ya no se necesitan
 * @param {NodeList|HTMLVideoElement[]} videos - Lista de elementos de video a limpiar
 */
export function cleanupVideos(videos) {
  videos = videos || document.querySelectorAll('video');
  
  videos.forEach(video => {
    video.pause();
    video.src = '';
    video.load();
  });
} 