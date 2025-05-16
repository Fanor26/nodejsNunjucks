export function renderCards(items, container) {
  console.log('items', items);
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  items.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-content">
          <h3>${item.nombre}</h3> <!-- Usamos "nombre" en lugar de "name" -->
          <p>ID: ${item._id}</p> <!-- Usamos "_id" en lugar de "id" -->
          <p>Estado: ${item.active ? 'Activo' : 'Desactivado'}</p>
          <div class="card-actions">
            <button class="activate-btn" data-id="${item._id}">⚡</button>
            <button class="deactivate-btn" data-id="${item._id}">⛔</button>
            <button class="update-btn" data-id="${item._id}">✏️</button>
            <button class="delete-btn" data-id="${item._id}">🗑️</button>
          </div>
        </div>
      `;
    cardContainer.appendChild(card);
  });

  container.appendChild(cardContainer);
}
