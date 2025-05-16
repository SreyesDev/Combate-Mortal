// Importar funciones de utilidad y datos
import { cleanupVideos } from './utils/performance.js';
import { FormatSelector } from './components/FormatSelector.js';
import { CharacterSelector } from './components/CharacterSelector.js';
import McData from '../data/mcs.js';

/**
 * Clase principal de la aplicación
 */
class CombateMortal {
  constructor() {
    this.elements = {};
    this.formatTimes = {
      'minutoLibre': 60,
      'tematica': 120,
      '8x8': 120,
      '1x1': 180,
      'minutosLibre': 120
    };
    this.formatNames = {
      'minutoLibre': 'MINUTO LIBRE',
      'tematica': 'TEMÁTICA',
      '8x8': '8X8',
      '1x1': '1X1',
      'minutosLibre': 'MINUTOS LIBRE'
    };

    this.initializeElements();
    this.initializeComponents();
    
    // Limpiar videos cuando se cierra la página
    window.addEventListener('beforeunload', () => cleanupVideos());
  }

  /**
   * Inicializar y cachear elementos del DOM
   */
  initializeElements() {
    Object.assign(this.elements, {
      // Formato
      formatSelection: document.getElementById('formatSelection'),
      formatCards: document.querySelectorAll('.format-card'),
      selectedFormatInfo: document.getElementById('selectedFormatInfo'),
      formatBadge: document.getElementById('formatBadge'),
      
      // Batalla
      battleArea: document.getElementById('battleArea'),
      selectionSection: document.getElementById('selectionSection'),
      
      // Elementos existentes
      characterGrid: document.getElementById('characterGrid'),
      selectionIndicator: document.getElementById('selectionIndicator'),
      fightButton: document.getElementById('fightButton'),
      vsIndicator: document.getElementById('vsIndicator'),
      leftPlaceholder: document.getElementById('leftPlaceholder'),
      rightPlaceholder: document.getElementById('rightPlaceholder'),
      leftCharacter: document.getElementById('leftCharacter'),
      rightCharacter: document.getElementById('rightCharacter'),
      leftCharacterImg: document.getElementById('leftCharacterImg'),
      leftCharacterVideo: document.getElementById('leftCharacterVideo'),
      leftCharacterName: document.getElementById('leftCharacterName'),
      rightCharacterImg: document.getElementById('rightCharacterImg'),
      rightCharacterVideo: document.getElementById('rightCharacterVideo'),
      rightCharacterName: document.getElementById('rightCharacterName')
    });
  }

  /**
   * Inicializar componentes
   */
  initializeComponents() {
    // Inicializar selector de formato
    this.formatSelector = new FormatSelector({
      elements: {
        formatCards: this.elements.formatCards,
        formatSelection: this.elements.formatSelection,
        battleArea: this.elements.battleArea,
        selectionSection: this.elements.selectionSection,
        formatBadge: this.elements.formatBadge,
        selectedFormatInfo: this.elements.selectedFormatInfo
      },
      formatTimes: this.formatTimes,
      formatNames: this.formatNames
    });
    
    // Inicializar selector de personajes
    this.characterSelector = new CharacterSelector({
      elements: {
        characterGrid: this.elements.characterGrid,
        selectionIndicator: this.elements.selectionIndicator,
        fightButton: this.elements.fightButton,
        vsIndicator: this.elements.vsIndicator,
        leftPlaceholder: this.elements.leftPlaceholder,
        rightPlaceholder: this.elements.rightPlaceholder,
        leftCharacter: this.elements.leftCharacter,
        rightCharacter: this.elements.rightCharacter,
        leftCharacterImg: this.elements.leftCharacterImg,
        leftCharacterVideo: this.elements.leftCharacterVideo,
        leftCharacterName: this.elements.leftCharacterName,
        rightCharacterImg: this.elements.rightCharacterImg,
        rightCharacterVideo: this.elements.rightCharacterVideo,
        rightCharacterName: this.elements.rightCharacterName
      },
      characterData: McData,
      onSelectionComplete: (selection) => this.handleSelectionComplete(selection)
    });
  }
  
  /**
   * Manejar cuando se completa la selección de personajes
   * @param {Object} selection - Datos de la selección
   */
  handleSelectionComplete(selection) {
    const { leftPlayer, rightPlayer } = selection;
    const format = this.formatSelector.getSelectedFormat();
    const formatTime = this.formatTimes[format];
    
    // Redirigir a la página de contador pasando los parámetros necesarios
    window.location.href = `contador.html?formato=${format}&tiempo=${formatTime}&nombreA=${encodeURIComponent(leftPlayer.nombreMC)}&nombreB=${encodeURIComponent(rightPlayer.nombreMC)}`;
  }
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  new CombateMortal();
}); 