export const colors = {
  primary: '#6200EE',
  primaryDark: '#3700B3',
  primaryLight: '#BB86FC',
  secondary: '#03DAC6',
  error: '#B00020',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#000000',
  onSurface: '#000000',
  onError: '#FFFFFF',
  border: '#DDDDDD',
  textPrimary: '#212121',
  textSecondary: '#757575',
};

export const inputBase = {
  width: '100%',
  padding: '12px 16px',
  fontSize: '1rem',
  borderRadius: '4px',
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.surface,
  transition: 'border 0.3s, box-shadow 0.3s',
  boxSizing: 'border-box',
};

export const focusShadow = `0 0 0 2px ${colors.primaryLight}`;

export const baseFormStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '2rem',
  backgroundColor: colors.background,
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

export const errorText = {
  color: colors.error,
  fontSize: '0.8rem',
  marginTop: '0.25rem',
  display: 'block',
};
