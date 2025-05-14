import { createLinkContainer } from './linkContainer.js';
import { setActiveLink } from '../../../../utils/hoverEffect.js';
import { handleRouteChange } from '../utils/handleRouteChange.js';

export function addLinksToElement(
  routes,
  element,
  isMobile,
  setIsOpen,
  elementLink
) {
  routes.forEach((route) => {
    const { linkContainer, arrowIcon } = createLinkContainer(
      route,
      elementLink,
      !!route.subroutes?.length
    );
    element.appendChild(linkContainer);

    if (route.subroutes?.length) {
      const subroutesContainer = document.createElement('div');
      subroutesContainer.style.cssText = `
        display: none;
        flex-direction: column;
        gap: 5px;
        padding: 0px 5px;
        margin-top: 5px;
      `;

      addLinksToElement(
        route.subroutes,
        subroutesContainer,
        isMobile,
        setIsOpen,
        elementLink
      );
      element.appendChild(subroutesContainer);

      linkContainer.addEventListener('click', async (e) => {
        if (e.target === arrowIcon) {
          e.preventDefault();
          const isOpenSubmenu = subroutesContainer.style.display === 'none';
          subroutesContainer.style.display = isOpenSubmenu ? 'flex' : 'none';
          arrowIcon.style.transform = isOpenSubmenu
            ? 'rotate(0deg)'
            : 'rotate(180deg)';
        } else {
          e.preventDefault();
          await handleRouteChange(route);
          setActiveLink(linkContainer, route.path, `.${elementLink}`);
          if (isMobile) setIsOpen(false); // ⬅️ Aquí cierras el sidebar
        }
      });
    } else {
      linkContainer.addEventListener('click', async (e) => {
        e.preventDefault();
        await handleRouteChange(route);
        setActiveLink(linkContainer, route.path, `.${elementLink}`);
        if (isMobile) setIsOpen(false); // ⬅️ También aquí
      });
    }
  });
}
