export default function Radiology() {
  return {
    type: 'container',
    styles: {
      padding: '2rem',
      backgroundColor: '#ecf0f1',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      fontFamily: 'Arial',
    },
    children: [
      {
        type: 'card',
        styles: {
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        },
        children: [
          {
            type: 'text',
            content: 'Radiología Avanzada',
            styles: {
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#2c3e50',
            },
          },
          {
            type: 'text',
            content:
              'Explora nuestros servicios avanzados de diagnóstico por imagen, como resonancia magnética, tomografías y rayos X de alta precisión.',
            styles: {
              fontSize: '1.1rem',
              color: '#555',
              lineHeight: '1.6',
            },
          },
          {
            type: 'button',
            label: 'Solicitar cita',
            styles: {
              marginTop: '1rem',
              backgroundColor: '#3498db',
              color: '#fff',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              alignSelf: 'start',
            },
            onClick: () => console.log('Solicitando cita...'),
          },
        ],
      },
      {
        type: 'html',
        content: `
          <img src="https://via.placeholder.com/900x300?text=Radiologia" alt="Radiología" style="width: 100%; border-radius: 8px;">
        `,
      },
      {
        type: 'datagrid',
        title: 'Últimos Exámenes Realizados',
        searchPlaceholder: 'Buscar paciente...',
        columns: [
          { title: 'Paciente', field: 'name' },
          { title: 'Estudio', field: 'exam' },
          { title: 'Fecha', field: 'date' },
        ],
        data: [
          { name: 'Juan Pérez', exam: 'Resonancia', date: '2025-05-10' },
          { name: 'Ana Torres', exam: 'Rayos X', date: '2025-05-11' },
          { name: 'Carlos Mejía', exam: 'Tomografía', date: '2025-05-12' },
        ],
      },
    ],
  };
}
