export function applySidebarStyles(
  side,
  content,
  navbar,
  footer,
  isSidebarOpen,
  isMobile = false,
  isAuthenticated
) {
  const transitionSpeed = isAuthenticated ? '0.3s' : '0.1s';

  Object.assign(side.style, {
    position: 'absolute',
    zIndex: '1000',
    width: '260px',
    left: '0',
    top: `${navbar.offsetHeight}px`,
    height: `calc(100vh - ${navbar.offsetHeight + footer.offsetHeight}px)`,

    backgroundColor: '#130242',
    color: '#fff',
    borderRadius: '12px 0 0 12px',
    boxShadow: '4px 0 15px rgba(0,0,0,0.2)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',

    padding: '8px',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'blur(4px)',

    transition: `transform ${transitionSpeed} ease, box-shadow ${transitionSpeed}`,
    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
  });

  Object.assign(content.style, {
    transition: `margin-left ${transitionSpeed} ease`,
  });
}
