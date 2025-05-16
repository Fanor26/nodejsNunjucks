export function createFloatingPhone(url) {
  // Crear el contenedor del celular flotante
  const floatingPhone = document.createElement('div');
  floatingPhone.id = 'floating-phone';
  floatingPhone.style.position = 'fixed';
  floatingPhone.style.bottom = '20px';
  floatingPhone.style.right = '20px';
  floatingPhone.style.width = '375px'; // Tamaño del celular
  floatingPhone.style.height = '650px'; // Ajuste para el celular
  floatingPhone.style.backgroundColor = '#fff';
  floatingPhone.style.borderRadius = '30px'; // Bordes redondeados
  floatingPhone.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
  floatingPhone.style.zIndex = '9999';
  floatingPhone.style.transition = 'transform 0.3s ease';
  floatingPhone.style.display = 'none'; // Inicialmente oculto

  // *** BODY ***
  const phoneBody = document.createElement('div');
  phoneBody.classList.add('phone-body');
  phoneBody.style.padding = '10px';
  phoneBody.style.position = 'absolute';
  phoneBody.style.top = '0'; // Sin espacio por encima
  phoneBody.style.left = '0';
  phoneBody.style.right = '0';
  phoneBody.style.bottom = '0';

  const iframe = document.createElement('iframe');
  iframe.src = url; // URL externa
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '20px';
  iframe.style.transform = 'scale(1)';

  phoneBody.appendChild(iframe);

  // Añadir body al celular flotante
  floatingPhone.appendChild(phoneBody);

  document.body.appendChild(floatingPhone);

  // ** Crear un botón adicional "Ver Mobile" fuera del iframe **
  const additionalButton = document.createElement('button');
  additionalButton.textContent = 'Ver Mobile'; // Texto del nuevo botón
  additionalButton.id = 'floating-phone-button'; // ID para el botón
  additionalButton.style.position = 'fixed';
  additionalButton.style.top = '20px'; // Ubicado en la parte superior
  additionalButton.style.let = '0'; // Ajustamos para que esté en la esquina superior derecha
  additionalButton.style.padding = '10px 20px';
  additionalButton.style.backgroundColor = '#FF5722'; // Color de fondo
  additionalButton.style.color = 'white';
  additionalButton.style.zIndex = '1500';
  additionalButton.style.border = 'none';
  additionalButton.style.borderRadius = '30px';
  additionalButton.style.fontSize = '16px';
  additionalButton.style.cursor = 'pointer';
  additionalButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
  additionalButton.style.transition = 'opacity 0.3s';

  // ** Agregar un evento para el botón "Ver Mobile" **
  additionalButton.addEventListener('click', () => {
    if (floatingPhone.style.display === 'none') {
      floatingPhone.style.display = 'block'; // Mostrar el celular flotante al presionar el botón
      additionalButton.textContent = 'Ocultar Mobile'; // Cambiar el texto a "Ocultar Mobile"
    } else {
      floatingPhone.style.display = 'none'; // Ocultar el celular flotante
      additionalButton.textContent = 'Ver Mobile'; // Cambiar el texto a "Ver Mobile"
    }
  });

  document.body.appendChild(additionalButton);

  // ** Evento para cerrar el celular si haces clic fuera **
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!floatingPhone.contains(target) && !additionalButton.contains(target)) {
      floatingPhone.style.display = 'none'; // Ocultar el celular flotante
      additionalButton.textContent = 'Ver Mobile'; // Volver al texto original
    }
  });

  // ** Verificar el tamaño de la pantalla y ajustar el tamaño del teléfono y iframe según el ancho **
  function handleResize() {
    if (window.innerWidth <= 768) {
      // Ocultar el celular y el botón si la pantalla es pequeña
      floatingPhone.style.display = 'none';
      additionalButton.style.display = 'none'; // Ocultar el botón también en pantallas pequeñas
    } else {
      // Mostrar el botón en pantallas grandes
      additionalButton.style.display = 'block';
      // Restaurar los tamaños cuando la pantalla es más grande
      floatingPhone.style.width = '375px';
      floatingPhone.style.height = '650px';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
    }
  }

  // Ejecutar la función al cargar la página y en cada cambio de tamaño de ventana
  window.addEventListener('resize', handleResize);
  handleResize(); // Llamar a la función al inicio para establecer el estado correcto

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // Permite arrastrar el celular
  floatingPhone.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - floatingPhone.offsetLeft;
    offsetY = e.clientY - floatingPhone.offsetTop;
    document.addEventListener('mousemove', movePhone);
    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.removeEventListener('mousemove', movePhone);
      savePhonePosition();
    });
  });

  function movePhone(e) {
    if (isDragging) {
      floatingPhone.style.left = `${e.clientX - offsetX}px`;
      floatingPhone.style.top = `${e.clientY - offsetY}px`;
    }
  }

  function savePhonePosition() {
    const position = {
      left: floatingPhone.offsetLeft,
      top: floatingPhone.offsetTop,
    };
    localStorage.setItem('phonePosition', JSON.stringify(position));
  }

  function loadPhonePosition() {
    const savedPosition = JSON.parse(localStorage.getItem('phonePosition'));
    if (savedPosition) {
      floatingPhone.style.left = `${savedPosition.left}px`;
      floatingPhone.style.top = `${savedPosition.top}px`;
    }
  }

  loadPhonePosition();
}
