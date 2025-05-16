import { lazyLoadImage } from '../utils/image-utils.js';
import { debounce } from '../utils/performance.js';

/**
 * Componente encargado de la selección de personajes
 */
export class CharacterSelector {
  /**
   * @param {Object} params - Parámetros de configuración
   * @param {Object} params.elements - Elementos del DOM
   * @param {Array} params.characterData - Datos de los personajes
   * @param {Function} params.onSelectionComplete - Callback para cuando se completa la selección
   */
  constructor({ elements, characterData, onSelectionComplete }) {
    this.elements = elements;
    this.characterData = characterData;
    this.onSelectionComplete = onSelectionComplete;
    this.selectionMode = 'left';
    this.selectedLeftIndex = null;
    this.selectedRightIndex = null;
    this.cardElements = [];
    
    this.createCharacterGrid();
    this.bindEvents();
  }
  
  /**
   * Vincular eventos de los elementos
   */
  bindEvents() {
    this.elements.leftPlaceholder.addEventListener('click', () => this.setSelectionMode('left'));
    this.elements.rightPlaceholder.addEventListener('click', () => this.setSelectionMode('right'));
    this.elements.fightButton.addEventListener('click', () => this.handleFightButtonClick());
  }
  
  /**
   * Crear la grilla de personajes
   */
  createCharacterGrid() {
    const fragment = document.createDocumentFragment();
    
    this.characterData.forEach((character, index) => {
      const card = document.createElement('div');
      card.className = 'character-card';
      card.dataset.index = index;
      
      const img = document.createElement('img');
      img.alt = character.nombreMC;
      img.dataset.lazy = 'true';
      
      card.appendChild(img);
      fragment.appendChild(card);
      this.cardElements[index] = card;
      
      // Lazy load de imagen
      lazyLoadImage(img, character.urlFoto || '/api/placeholder/100/100');
    });
    
    this.elements.characterGrid.appendChild(fragment);
    
    // Usar delegación de eventos para mejor rendimiento
    this.elements.characterGrid.addEventListener('click', (event) => this.handleCardClick(event));
  }
  
  /**
   * Manejar click en una tarjeta de personaje
   * @param {Event} event - Evento del click
   */
  handleCardClick(event) {
    const card = event.target.closest('.character-card');
    if (!card) return;
    
    const index = parseInt(card.dataset.index);
    const character = this.characterData[index];
    this.selectCharacter(index, character);
  }
  
  /**
   * Seleccionar un personaje
   * @param {number} index - Índice del personaje
   * @param {Object} character - Datos del personaje
   */
  selectCharacter(index, character) {
    if (this.selectionMode === 'left') {
      this.selectedLeftIndex = index;
      this.showCharacter('left', character);
      this.setSelectionMode('right');
    } else {
      this.selectedRightIndex = index;
      this.showCharacter('right', character);
      this.setSelectionMode('left');
    }
    
    // Optimizar updates visuales
    requestAnimationFrame(() => {
      this.updateCardStyles();
      this.updateVS();
      this.updateFightButton();
    });
  }
  
  /**
   * Mostrar personaje seleccionado
   * @param {string} side - Lado ('left' o 'right')
   * @param {Object} character - Datos del personaje
   */
  showCharacter(side, character) {
    const isLeft = side === 'left';
    const placeholder = isLeft ? this.elements.leftPlaceholder : this.elements.rightPlaceholder;
    const characterEl = isLeft ? this.elements.leftCharacter : this.elements.rightCharacter;
    const img = isLeft ? this.elements.leftCharacterImg : this.elements.rightCharacterImg;
    const video = isLeft ? this.elements.leftCharacterVideo : this.elements.rightCharacterVideo;
    const name = isLeft ? this.elements.leftCharacterName : this.elements.rightCharacterName;
    
    placeholder.style.display = 'none';
    characterEl.classList.add('visible');
    
    // Gestión de video/imagen
    if (character.urlVideo && character.urlVideo.trim() && character.urlVideo !== 'assets/videos/mcs/') {
      video.src = character.urlVideo;
      video.style.display = 'block';
      img.style.display = 'none';
      video.load();
      
      // Cargar video async sin bloquear
      video.play().catch(() => {
        // Si falla el video, usar imagen
        video.style.display = 'none';
        img.src = character.urlFoto || '/api/placeholder/300/400';
        img.style.display = 'block';
      });
    } else {
      img.src = character.urlFoto || '/api/placeholder/300/400';
      img.style.display = 'block';
      video.style.display = 'none';
    }
    
    name.textContent = character.nombreMC;
  }
  
  /**
   * Actualizar estilos de las tarjetas
   */
  updateCardStyles() {
    this.cardElements.forEach((card, index) => {
      const classList = card.classList;
      classList.remove('selected-left', 'selected-right', 'selected-both');
      
      if (index === this.selectedLeftIndex && index === this.selectedRightIndex) {
        classList.add('selected-both');
      } else if (index === this.selectedLeftIndex) {
        classList.add('selected-left');
      } else if (index === this.selectedRightIndex) {
        classList.add('selected-right');
      }
    });
  }
  
  /**
   * Actualizar indicador VS
   */
  updateVS = debounce(() => {
    const shouldShow = this.selectedLeftIndex !== null && this.selectedRightIndex !== null;
    this.elements.vsIndicator.classList.toggle('visible', shouldShow);
  }, 50);
  
  /**
   * Actualizar botón de lucha
   */
  updateFightButton = debounce(() => {
    const shouldShow = this.selectedLeftIndex !== null && this.selectedRightIndex !== null;
    this.elements.fightButton.classList.toggle('visible', shouldShow);
  }, 50);
  
  /**
   * Cambiar modo de selección
   * @param {string} mode - Modo de selección ('left' o 'right')
   */
  setSelectionMode(mode) {
    this.selectionMode = mode;
    
    this.elements.selectionIndicator.textContent = 'Selecciona los MC';
    if (mode === 'left') {
      this.elements.selectionIndicator.className = 'selection-indicator selecting-left';
    } else {
      this.elements.selectionIndicator.className = 'selection-indicator selecting-right';
    }
  }
  
  /**
   * Manejar clic en botón de lucha
   */
  handleFightButtonClick() {
    if (this.selectedLeftIndex !== null && this.selectedRightIndex !== null) {
      const leftPlayer = this.characterData[this.selectedLeftIndex];
      const rightPlayer = this.characterData[this.selectedRightIndex];
      
      if (typeof this.onSelectionComplete === 'function') {
        this.onSelectionComplete({
          leftPlayer,
          rightPlayer,
          leftIndex: this.selectedLeftIndex,
          rightIndex: this.selectedRightIndex
        });
      }
    }
  }
  
  /**
   * Obtener los personajes seleccionados
   * @returns {Object} Los personajes seleccionados
   */
  getSelectedCharacters() {
    return {
      left: this.selectedLeftIndex !== null ? this.characterData[this.selectedLeftIndex] : null,
      right: this.selectedRightIndex !== null ? this.characterData[this.selectedRightIndex] : null
    };
  }
} 