export function renderClockWidget() {
  const container = document.getElementById('clock-container');
  if (!container) return;

  const clock = document.createElement('div');
  clock.id = 'clock-widget';
  clock.style.cssText = `
    display: inline-block;
    background-color: #ffffffcc;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Segoe UI', Roboto, sans-serif;
    color: #222;
    min-width: 120px;
    text-align: center;
  `;

  const updateClock = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    clock.textContent = timeString;
  };

  updateClock();
  setInterval(updateClock, 1000);

  container.appendChild(clock);
}
