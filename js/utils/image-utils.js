/**
 * Carga diferida de imágenes para mejor rendimiento
 * @param {HTMLImageElement} img - Elemento de imagen a cargar
 * @param {string} src - URL de la imagen
 * @returns {Promise} Promesa que se resuelve cuando la imagen se carga
 */
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