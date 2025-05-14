export function getStoreNodes(state) {
  const displayNodes = (obj, parentKey = '') => {
    let result = '';
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
          result += displayNodes(value, newKey);
        } else {
          result += `${newKey}: ${JSON.stringify(value)}\n`;
        }
      }
    }
    return result;
  };

  const output = displayNodes(state);
  console.log('🧩 Nodos generados:\n' + output);
  return output;
}
