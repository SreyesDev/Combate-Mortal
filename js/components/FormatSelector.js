/**
 * Componente encargado de la selección de formato
 */
export class FormatSelector {
  /**
   * @param {Object} params - Parámetros de configuración
   * @param {Object} params.elements - Elementos del DOM
   * @param {Function} params.onFormatSelected - Callback para cuando se selecciona un formato
   * @param {Object} params.formatTimes - Tiempos para cada formato
   * @param {Object} params.formatNames - Nombres de cada formato
   */
  constructor({ elements, onFormatSelected, formatTimes, formatNames }) {
    this.elements = elements;
    this.onFormatSelected = onFormatSelected;
    this.formatTimes = formatTimes;
    this.formatNames = formatNames;
    this.selectedFormat = null;
    
    this.bindEvents();
  }
  
  /**
   * Vincular eventos de los elementos
   */
  bindEvents() {
    this.elements.formatCards.forEach(card => {
      card.addEventListener('click', (e) => this.handleFormatSelection(e));
    });
  }
  
  /**
   * Manejar la selección de un formato
   * @param {Event} event - Evento del click
   */
  handleFormatSelection(event) {
    const card = event.currentTarget;
    const format = card.dataset.format;
    
    this.selectedFormat = format;
    
    // Mostrar sección de selección de personajes
    this.elements.formatSelection.style.display = 'none';
    this.elements.battleArea.style.display = 'flex';
    this.elements.selectionSection.style.display = 'block';
    
    // Mostrar el badge del formato seleccionado
    this.elements.formatBadge.textContent = `${this.formatNames[format]} - ${this.formatTimes[format]}s`;
    this.elements.selectedFormatInfo.style.display = 'block';
    
    // Notificar al callback
    if (typeof this.onFormatSelected === 'function') {
      this.onFormatSelected(format);
    }
  }
  
  /**
   * Obtener el formato seleccionado
   * @returns {string} El formato seleccionado
   */
  getSelectedFormat() {
    return this.selectedFormat;
  }
  
  /**
   * Obtener el tiempo del formato seleccionado
   * @returns {number} El tiempo en segundos
   */
  getSelectedFormatTime() {
    return this.formatTimes[this.selectedFormat];
  }
} 