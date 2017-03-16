export const preventTransition = () => {
  // pass state that prevents transistion
};

export const bind = (fn, that) => fn.bind(that);

export const capitalize = text => (text[0].toUpperCase() + text.substr(1));

export const toCamelCase = (text) => {
  const idx = text.indexOf('-');

  if (idx === -1) {
    return text;
  }

  return text.replace(/-.*/, text[idx + 1].toUpperCase() + text.substr(idx + 2));
};
