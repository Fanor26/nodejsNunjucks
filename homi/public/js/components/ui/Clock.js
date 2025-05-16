export default function SovietMilitaryClock() {
  const hours = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII',
  ];
  const degrees = Array.from({ length: 60 }, (_, i) => i * 6);

  // Animación de manecillas (precisión milimétrica)
  const updateClock = () => {
    const now = new Date();
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    if (hourHand && minuteHand && secondHand) {
      const hoursAngle = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
      const minutesAngle = now.getMinutes() * 6;
      const secondsAngle = now.getSeconds() * 6;

      hourHand.style.transform = `translate(-50%, -100%) rotate(${hoursAngle}deg)`;
      minuteHand.style.transform = `translate(-50%, -100%) rotate(${minutesAngle}deg)`;
      secondHand.style.transform = `translate(-50%, -100%) rotate(${secondsAngle}deg)`;
    }
  };

  setInterval(updateClock, 1000);
  updateClock();

  return {
    type: 'container',
    styles: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
      maxWidth: '280px',
      margin: '20px auto',
      fontFamily: '"Arial", sans-serif',
    },
    children: [
      {
        type: 'div',
        className: 'clock-face',
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
          // Marcas de minutos (60 líneas)
          ...degrees.map((deg) => ({
            type: 'div',
            styles: {
              position: 'absolute',
              width: deg % 30 === 0 ? '2px' : '1px',
              height: deg % 30 === 0 ? '12px' : deg % 5 === 0 ? '8px' : '4px',
              backgroundColor: deg % 15 === 0 ? '#ff0000' : '#ffd700',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${deg}deg) translate(0, -${
                deg % 30 === 0 ? 90 : 95
              }px)`,
              transformOrigin: 'center',
              zIndex: 2,
            },
          })),
          // Números romanos (horas)
          ...hours.map((hour, i) => ({
            type: 'text',
            content: hour,
            styles: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              fontSize: '14px',
              color: '#ffd700',
              fontWeight: 'bold',
              transform: `translate(-50%, -50%) rotate(${
                i * 30
              }deg) translate(0, -70px) rotate(-${i * 30}deg)`,
              zIndex: 3,
              textShadow: '0 0 2px #000',
            },
          })),
          // Manecillas (horas, minutos, segundos)
          {
            type: 'div',
            className: 'hour-hand',
            styles: {
              position: 'absolute',
              width: '6px',
              height: '60px',
              backgroundColor: '#ff0000',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -100%)',
              transformOrigin: 'center bottom',
              zIndex: 4,
              borderRadius: '4px',
              boxShadow: '0 -3px 0 rgba(0,0,0,0.3) inset', // Muesca en la base
            },
          },
          {
            type: 'div',
            className: 'minute-hand',
            styles: {
              position: 'absolute',
              width: '4px',
              height: '90px',
              backgroundColor: '#fff',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -100%)',
              transformOrigin: 'center bottom',
              zIndex: 5,
              borderRadius: '2px',
            },
          },
          {
            type: 'div',
            className: 'second-hand',
            styles: {
              position: 'absolute',
              width: '1px',
              height: '90px',
              backgroundColor: '#ffd700',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -100%)',
              transformOrigin: 'center bottom',
              zIndex: 6,
            },
          },
          // Tapón central CON PUNTO (clavo)
          {
            type: 'div',
            styles: {
              position: 'absolute',
              width: '18px',
              height: '18px',
              background: 'radial-gradient(circle, #ffd700 10%, #5a0000 90%)',
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 7,
              border: '2px solid #000',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
            },
            children: [
              {
                type: 'div',
                styles: {
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#c11b17',
                  borderRadius: '50%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 8,
                  boxShadow: '0 0 3px rgba(0,0,0,0.8)',
                },
              },
            ],
          },
          // Sello de fábrica (СССР)
          {
            type: 'div',
            styles: {
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '10px',
              textAlign: 'center',
              zIndex: 9,
            },
            content: 'СССР • ЗАВОД №62',
          },
        ],
      },
      // Título
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
        content: 'АРТИЛЛЕРИЙСКИЕ ЧАСЫ • КП-1',
      },
    ],
  };
}
