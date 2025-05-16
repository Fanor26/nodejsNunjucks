export default function specialty() {
  const baseData = [
    { id: 1, specialty: 'Cardiología', doctors: 5, availability: 'Alta' },
    { id: 2, specialty: 'Pediatría', doctors: 8, availability: 'Media' },
    { id: 3, specialty: 'Neurología', doctors: 3, availability: 'Baja' },
  ];

  // Generar 40 filas adicionales ejemplo
  for (let i = 4; i <= 43; i++) {
    baseData.push({
      id: i,
      specialty: `Especialidad ${i}`,
      doctors: Math.floor(Math.random() * 10) + 1,
      availability: ['Alta', 'Media', 'Baja'][Math.floor(Math.random() * 3)],
    });
  }

  return {
    type: 'datagrid',
    minWidth: '600px',
    columns: [
      {
        field: 'id',
        title: 'ID',
        minWidth: '80px',
        width: '80px',
        headerStyles: { textAlign: 'center' },
        cellStyles: { textAlign: 'center' },
      },
      {
        field: 'specialty',
        title: 'Especialidad Médica',
        minWidth: '200px',
        width: '1fr',
        cellStyles: { fontWeight: '500' },
      },
      {
        field: 'doctors',
        title: 'Doctores',
        minWidth: '100px',
        width: '100px',
        headerStyles: { textAlign: 'center' },
        cellStyles: { textAlign: 'center' },
      },
      {
        field: 'availability',
        title: 'Disponibilidad',
        minWidth: '120px',
        width: '120px',
        headerStyles: { textAlign: 'center' },
        cellStyles: {
          textAlign: 'center',
          fontWeight: 'bold',
        },
        dynamicStyles: (value) => ({
          color:
            value === 'Alta'
              ? '#27ae60'
              : value === 'Media'
              ? '#f39c12'
              : '#e74c3c',
        }),
      },
    ],
    data: baseData,
    evenRowColor: '#f8f9fa',
    oddRowColor: '#ffffff',
    containerStyles: {
      maxHeight: '500px',
      overflowY: 'auto',
    },
    onAdd: () => {
      alert('add row');
    },
  };
}
