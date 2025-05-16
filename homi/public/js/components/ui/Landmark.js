export default function Landmark() {
  const directions = ['С', 'В', 'Ю', 'З']; // Cirílico: Norte, Este, Sur, Oeste
  const degrees = Array.from({ length: 36 }, (_, i) => i * 10); // Marcas cada 10°

  const createCompassMarks = () => {
    const radius = 85;
    const elements = [];

    // Puntos cardinales (estilo militar)
    directions.forEach((dir, i) => {
      const angle = i * 90;
      elements.push({
        type: 'text',
        content: dir,
        styles: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          fontSize: '14px',
          color: '#ff0000', // Rojo militar
          fontWeight: 'bold',
          transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${radius}px) rotate(-${angle}deg)`,
          zIndex: 2,
          textShadow: '0 0 2px #000',
        },
      });
    });

    // Marcas de grados (para artillería)
    degrees.forEach((deg) => {
      const rad = (deg * Math.PI) / 180;
      const markLength = deg % 90 === 0 ? 12 : deg % 30 === 0 ? 8 : 4;
      elements.push({
        type: 'div',
        styles: {
          position: 'absolute',
          width: '2px',
          height: `${markLength}px`,
          backgroundColor: '#fff',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${deg}deg) translate(0, -${
            radius - 5
          }px) rotate(-${deg}deg)`,
          zIndex: 1,
        },
      });
    });

    return elements;
  };

  // Animación suave (simula búsqueda del norte)
  const updateNeedle = () => {
    const needle = document.querySelector('.compass-needle');
    if (needle) {
      const drift = Math.sin(Date.now() / 3000) * 5; // Pequeña deriva realista
      const angle = (350 + drift) % 360; // ~Norte magnético con variación
      needle.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    }
  };

  setInterval(updateNeedle, 16);

  return {
    type: 'container',
    styles: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#222',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
      maxWidth: '300px',
      margin: '20px auto',
      fontFamily: '"Arial", sans-serif',
    },
    children: [
      {
        type: 'div',
        className: 'compass-face',
        styles: {
          position: 'relative',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          backgroundColor: '#2a2a2a',
          border: '8px solid #5a0000',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.7)',
        },
        children: [
          // Anillo de miliradianes (para artillería)
          {
            type: 'div',
            styles: {
              position: 'absolute',
              width: '90%',
              height: '90%',
              borderRadius: '50%',
              border: '1px dashed rgba(255, 255, 0, 0.3)',
              top: '5%',
              left: '5%',
              zIndex: 1,
            },
          },
          ...createCompassMarks(),
          // Aguja militar (roja/blanca)
          // Aguja principal (ahora atraviesa el tapón)
          {
            type: 'div',
            className: 'compass-needle',
            styles: {
              position: 'absolute',
              width: '2px', // Más delgada (como en modelos reales)
              height: '110px', // Más larga (sobresale del tapón)
              background: 'linear-gradient(to bottom, #ff0000 40%, #fff 60%)', // Rojo/blanco
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)', // Centrado perfecto
              transformOrigin: 'center center', // Rota desde el centro geométrico
              zIndex: 3,
              borderRadius: '1px',
            },
          },

          // Tapón central (más pequeño y transparente)
          {
            type: 'div',
            styles: {
              position: 'absolute',
              width: '16px', // Más pequeño (antes 20px)
              height: '16px',
              background:
                'radial-gradient(circle, rgba(255, 255, 0, 0.8) 30%, rgba(90, 0, 0, 0.5) 100%)', // Semitransparente
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 4, // Encima de la aguja
              border: '1px solid #000',
              boxShadow: '0 0 5px rgba(255, 255, 0, 0.5)',
            },
          },
          // Cadena de transporte (estilo militar)
          {
            type: 'div',
            styles: {
              position: 'absolute',
              width: '100%',
              height: '20px',
              top: '-25px',
              left: '0',
              background:
                'repeating-linear-gradient(to right, #555, #555 10px, #333 10px, #333 20px)',
              zIndex: 5,
            },
          },
        ],
      },
      // Leyenda auténtica
      {
        type: 'div',
        styles: {
          marginTop: '15px',
          color: '#ff0000',
          fontWeight: 'bold',
          fontSize: '12px',
          letterSpacing: '1px',
          textAlign: 'center',
        },
        children: [
          {
            type: 'span',
            content: 'АРТИЛЛЕРИЙСКИЙ КОМПАС • ',
            styles: { textShadow: '0 0 2px #000' },
          },
          { type: 'span', content: 'СССР', styles: { fontStyle: 'italic' } },
        ],
      },
    ],
  };
}
