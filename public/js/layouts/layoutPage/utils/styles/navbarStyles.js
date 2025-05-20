export const navbarStyles = {
  navbar: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '0 2rem',
    height: '4rem',
    backgroundColor: 'rgba(6, 4, 61, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },

  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  logoText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 2,
    gap: '1rem',
  },

  menuItem: {
    color: '#edf2f7',
    fontWeight: '500',
    padding: '0.5rem 0',
    cursor: 'pointer',
    position: 'relative',
    '::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '0',
      height: '2px',
      backgroundColor: '#667eea',
      transition: 'width 0.3s ease',
    },
    ':hover': {
      color: '#667eea',
      '::after': {
        width: '100%',
      },
    },
  },

  activeMenuItem: {
    color: '#667eea',
    fontWeight: '600',
    '::after': {
      width: '100%',
    },
  },

  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    gap: '1rem',
  },

  avatar: {
    borderRadius: '50%',
    border: '2px solid #edf2f7',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    ':hover': { transform: 'scale(1.05)' },
  },

  userName: {
    color: 'white',
    fontWeight: '500',
    marginRight: '1rem',
    maxWidth: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  logoutButton: {
    padding: '0.5rem 1.25rem',
    backgroundColor: 'transparent',
    color: '#f56565',
    border: '1px solid #f56565',
    borderRadius: '0.375rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#f56565',
      color: 'white',
    },
  },

  authButton: {
    padding: '0.5rem 1.25rem',
    backgroundColor: 'transparent',
    color: '#667eea',
    border: '1px solid #667eea',
    borderRadius: '0.375rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
    },
  },

  registerButton: {
    backgroundColor: '#667eea',
    color: 'white',
    ':hover': {
      backgroundColor: '#5a67d8',
    },
  },
};
