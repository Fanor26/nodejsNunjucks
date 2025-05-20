export default function Roulette() {
  const prizes = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  const colors = [
    '#e74c3c',
    '#c0392b',
    '#e74c3c',
    '#c0392b',
    '#e74c3c',
    '#c0392b',
    '#e74c3c',
    '#c0392b',
    '#e74c3c',
    '#c0392b',
    '#e74c3c',
    '#c0392b',
  ];
  let rotation = 0;
  let isSpinning = false;

  const spin = () => {
    if (isSpinning) return;

    isSpinning = true;
    const wheel = document.querySelector('.wheel');
    const resultDisplay = document.querySelector('.result-display');

    // Rotación aleatoria (5-10 vueltas + premio aleatorio)
    rotation += 1800 + Math.floor(Math.random() * 1800);
    const selectedPrize = Math.floor((rotation % 360) / 30);

    wheel.style.transition =
      'transform 5s cubic-bezier(0.17, 0.67, 0.21, 0.99)';
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
      resultDisplay.textContent = `¡Número: ${prizes[selectedPrize]}!`;
      resultDisplay.style.backgroundColor = colors[selectedPrize];
      isSpinning = false;
    }, 5000);
  };

  const createSegments = () => {
    return prizes.map((prize, i) => {
      const angle = i * 30;
      return {
        type: 'div',
        className: 'segment',
        styles: {
          position: 'absolute',
          width: '60px',
          height: '60px',
          backgroundColor: colors[i],
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          transform: `
            rotate(${angle}deg) 
            translate(70px) 
            rotate(-${angle}deg)
          `,
          cursor: 'pointer',
          ':hover': {
            transform: `
              rotate(${angle}deg) 
              translate(70px) 
              rotate(-${angle}deg)
              scale(1.1)
            `,
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          },
        },
        content: prize,
        onClick: () => !isSpinning && spin(),
      };
    });
  };

  return {
    type: 'container',
    styles: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
    },
    children: [
      {
        type: 'div',
        className: 'wheel-container',
        styles: {
          position: 'relative',
          width: '300px',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        children: [
          {
            type: 'div',
            className: 'wheel',
            styles: {
              position: 'relative',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: '#3498db',
              transition: 'transform 0.1s',
            },
            children: createSegments(),
          },
          {
            type: 'div',
            className: 'pointer',
            styles: {
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: '30px solid #2c3e50',
              zIndex: '10',
            },
          },
        ],
      },
      {
        type: 'div',
        className: 'result-display',
        styles: {
          padding: '15px 30px',
          backgroundColor: '#2c3e50',
          color: 'white',
          borderRadius: '5px',
          fontSize: '24px',
          fontWeight: 'bold',
          minWidth: '150px',
          textAlign: 'center',
        },
        content: 'Presiona GIRAR',
      },
      {
        type: 'button',
        className: 'spin-button',
        content: 'GIRAR',
        styles: {
          padding: '12px 30px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#c0392b',
          },
        },
        onClick: spin,
      },
    ],
  };
}
