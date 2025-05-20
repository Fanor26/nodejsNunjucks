import DataGrid from '../elementTypes/dataGrid.js';

export default function Calculator() {
  let currentInput = '';
  let lastResult = null;
  let history = [];

  const handleButtonClick = (value) => {
    if (value === 'C') {
      clearInput();
      return;
    }

    if (value === '=') {
      calculateResult();
      return;
    }

    if (lastResult !== null && ['+', '-', '*', '/'].includes(value)) {
      currentInput = lastResult + value;
      lastResult = null;
    } else if (lastResult !== null) {
      currentInput = value;
      lastResult = null;
    } else {
      currentInput += value;
    }

    updateDisplay();
  };

  const calculateResult = () => {
    try {
      if (!currentInput || !/\d/.test(currentInput)) return;

      const expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
      const result = basicCalculator(expression);

      lastResult = String(
        Number.isInteger(result) ? result : parseFloat(result.toFixed(6))
      );

      const now = new Date();
      const timestamp = now.toLocaleString();

      // Añadir al historial (con operación, resultado, fecha)
      history.unshift({
        operation: currentInput,
        result: lastResult,
        timestamp: timestamp,
      });

      if (history.length > 10) history.pop();

      currentInput = lastResult;
      updateDisplay();
      updateHistory();
    } catch (error) {
      console.error('[Error]', error.message);
      currentInput = 'Error';
      updateDisplay();
      setTimeout(clearInput, 1000);
    }
  };

  const basicCalculator = (expr) => {
    const tokens = expr.match(/(\d+(\.\d+)?|[+\-*/])/g);
    if (!tokens) throw new Error('Expresión inválida');

    const stack = [];
    let currentOp = '+';

    for (let token of tokens) {
      if (['+', '-', '*', '/'].includes(token)) {
        currentOp = token;
      } else {
        let num = parseFloat(token);
        if (isNaN(num)) throw new Error('Número inválido');

        if (currentOp === '+') stack.push(num);
        if (currentOp === '-') stack.push(-num);
        if (currentOp === '*') stack.push(stack.pop() * num);
        if (currentOp === '/') stack.push(stack.pop() / num);
      }
    }

    return stack.reduce((a, b) => a + b, 0);
  };

  const clearInput = () => {
    currentInput = '';
    lastResult = null;
    updateDisplay();
  };

  const updateDisplay = () => {
    const display = document.querySelector('.calculator-display');
    if (display) {
      display.innerText = currentInput || '0';
    }
  };
  const updateHistory = () => {
    const historyContainer = document.querySelector('.calculator-history');
    if (historyContainer) {
      historyContainer.innerHTML = ''; // Limpiar contenido

      if (history.length === 0) {
        historyContainer.textContent = 'Historial vacío';
        return;
      }

      const dataGrid = DataGrid.create({
        title: 'Historial de Operaciones',
        searchPlaceholder: 'Buscar operación...',
        columns: [
          { title: 'Operación', field: 'operation', minWidth: '150px' },
          { title: 'Resultado', field: 'result', minWidth: '100px' },
          { title: 'Fecha', field: 'timestamp', minWidth: '180px' },
        ],
        data: history,
      });

      historyContainer.appendChild(dataGrid);
    }
  };

  const buttons = [
    '7',
    '8',
    '9',
    '÷',
    '4',
    '5',
    '6',
    '×',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    '=',
    '+',
    'C',
  ];

  return {
    type: 'container',
    children: [
      {
        type: 'container',
        styles: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          maxWidth: '360px',
          margin: '40px auto',
          gap: '20px',
        },
        children: [
          {
            type: 'div',
            className: 'calculator-display',
            content: '0',
            styles: {
              width: '100%',
              backgroundColor: '#f9f9f9',
              padding: '1rem',
              borderRadius: '12px',
              fontSize: '2.5rem',
              textAlign: 'right',
              color: '#2c3e50',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
            },
          },
          {
            type: 'container',
            className: 'buttons-grid',
            styles: {
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            },
            children: buttons.map((btn) => ({
              type: 'button',
              label: btn,
              styles: {
                padding: '20px',
                backgroundColor:
                  btn === 'C' ? '#e74c3c' : btn === '=' ? '#2ecc71' : '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                gridColumn: btn === 'C' ? 'span 4' : 'auto',
                transition: 'all 0.2s ease-in-out',
              },
              onClick: () => handleButtonClick(btn),
            })),
          },
        ],
      },

      {
        type: 'div',
        className: 'calculator-history',
        styles: {
          marginTop: '30px',
          padding: '1rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          maxHeight: '200px',
          overflowY: 'auto',
          fontSize: '1rem',
          color: '#555',
        },
        content: 'Historial vacío',
      },
    ],
  };
}
