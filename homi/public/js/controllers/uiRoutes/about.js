import { debugLog } from '../../debug.js';

export default function about() {
  // Estado para controlar los dos contadores
  let counter1 = 0;
  let counter2 = 0;

  // Estado para controlar si el contenido está en modo de edición
  let isEditing = false;
  let markdownContent = `# Sobre Nosotros\n\n**Sistema de Gestión Médica**\n\n- Fundado en 2023\n- Especializado en clínicas\n- Soporte 24/7\n\n[Contacto](mailto:info@clinica.com)`;

  // Función para manejar el clic en el botón de edición
  const handleEditClick = () => {
    isEditing = !isEditing; // Cambia entre modo edición y modo visualización
    updateContent();
  };

  // Función para actualizar el contenido de la sección
  const updateContent = () => {
    const contentElement = document.querySelector('.markdown-content');

    if (isEditing) {
      contentElement.innerHTML = `<textarea id="editor" style="width: 100%; height: 200px; border: 1px solid #ddd; padding: 10px;">${markdownContent}</textarea>`;
      // Crear un botón de guardar
      contentElement.innerHTML += `<button onclick="saveContent()">Guardar cambios</button>`;
    } else {
      // Mostrar contenido de Markdown cuando no se edita
      contentElement.innerHTML = marked(markdownContent); // Usamos "marked" para convertir Markdown a HTML
    }
  };

  // Función para guardar el contenido editado
  const saveContent = () => {
    const editor = document.getElementById('editor');
    markdownContent = editor.value; // Actualiza el contenido con lo que el usuario escribió
    isEditing = false; // Vuelve a desactivar el modo de edición
    updateContent(); // Actualiza el contenido con el nuevo markdown
  };

  // Función para incrementar el contador 1
  const incrementCounter1 = () => {
    counter1++; // Incrementamos el contador 1
    debugLog(`Contador 1 incrementado: ${counter1}`); // Mostrar el contador 1 con debugLog
    updateCounterDisplay(); // Actualizamos la visualización de ambos contadores
  };

  // Función para disminuir el contador 1
  const decrementCounter1 = () => {
    counter1--; // Decrementamos el contador 1
    debugLog(`Contador 1 disminuido: ${counter1}`); // Mostrar el contador 1 con debugLog
    updateCounterDisplay(); // Actualizamos la visualización de ambos contadores
  };

  // Función para incrementar el contador 2
  const incrementCounter2 = () => {
    counter2++; // Incrementamos el contador 2
    debugLog(`Contador 2 incrementado: ${counter2}`); // Mostrar el contador 2 con debugLog
    updateCounterDisplay(); // Actualizamos la visualización de ambos contadores
  };

  // Función para disminuir el contador 2
  const decrementCounter2 = () => {
    counter2--; // Decrementamos el contador 2
    debugLog(`Contador 2 disminuido: ${counter2}`); // Mostrar el contador 2 con debugLog
    updateCounterDisplay(); // Actualizamos la visualización de ambos contadores
  };

  // Función para actualizar los contadores en el DOM
  const updateCounterDisplay = () => {
    const counter1Element = document.querySelector('.counter1-text');
    const counter2Element = document.querySelector('.counter2-text');

    if (counter1Element) {
      counter1Element.innerText = `Contador 1: ${counter1}`; // Actualizamos el contador 1
    }
    if (counter2Element) {
      counter2Element.innerText = `Contador 2: ${counter2}`; // Actualizamos el contador 2
    }
  };

  // Contenido de la página
  return {
    type: 'container',
    children: [
      {
        type: 'markdown', // Usamos Markdown para el contenido inicial
        content: markdownContent,
        styles: {
          backgroundColor: '#f9f9f9',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
        },
        className: 'markdown-content', // Le damos una clase para acceder fácilmente
      },
      {
        type: 'button',
        label: 'Editar Markdown', // Botón para activar el modo de edición
        styles: {
          display: 'block',
          width: '100%',
          margin: '8px 0',
          padding: '10px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        },
        onClick: handleEditClick, // Llamamos a la función cuando se hace clic
      },

      {
        type: 'text', // Este es el contenedor donde se muestra el valor del contador 1
        content: `Contador 1: ${counter1}`,
        className: 'counter1-text', // Le damos una clase para que sea más fácil seleccionar y actualizar
        styles: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333',
        },
      },
      {
        type: 'button',
        label: 'Incrementar Contador 1',
        styles: {
          display: 'block',
          width: '100%',
          margin: '8px 0',
          padding: '10px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        },
        onClick: incrementCounter1, // Llamamos a la función para incrementar el contador 1
      },
      {
        type: 'button',
        label: 'Disminuir Contador 1',
        styles: {
          display: 'block',
          width: '100%',
          margin: '8px 0',
          padding: '10px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        },
        onClick: decrementCounter1, // Llamamos a la función para disminuir el contador 1
      },

      {
        type: 'text', // Este es el contenedor donde se muestra el valor del contador 2
        content: `Contador 2: ${counter2}`,
        className: 'counter2-text', // Le damos una clase para que sea más fácil seleccionar y actualizar
        styles: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333',
        },
      },
      {
        type: 'button',
        label: 'Incrementar Contador 2',
        styles: {
          display: 'block',
          width: '100%',
          margin: '8px 0',
          padding: '10px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        },
        onClick: incrementCounter2, // Llamamos a la función para incrementar el contador 2
      },
      {
        type: 'button',
        label: 'Disminuir Contador 2',
        styles: {
          display: 'block',
          width: '100%',
          margin: '8px 0',
          padding: '10px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        },
        onClick: decrementCounter2, // Llamamos a la función para disminuir el contador 2
      },
    ],
  };
}
