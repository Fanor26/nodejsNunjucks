// /js/styles/components/common/dropdownStyles.js

export function applyStylesDropdownMenu(ulElement) {
  ulElement.style.listStyle = 'none';
  ulElement.style.paddingLeft = '10px';
  ulElement.style.margin = '0';
  ulElement.style.backgroundColor = '#1e1e1e';
  ulElement.style.border = '1px solid #444';
  ulElement.style.borderRadius = '5px';
  ulElement.style.padding = '5px';
  ulElement.style.color = 'blue';
  ulElement.style.fontFamily = 'sans-serif';
}

export function applyStylesItem(liElement) {
  liElement.style.cursor = 'pointer';
  liElement.style.margin = '5px 0';
  liElement.style.padding = '5px 8px';
  liElement.style.borderRadius = '4px';

  liElement.addEventListener('mouseenter', () => {
    liElement.style.backgroundColor = '#333';
  });

  liElement.addEventListener('mouseleave', () => {
    liElement.style.backgroundColor = 'white';
  });
}
