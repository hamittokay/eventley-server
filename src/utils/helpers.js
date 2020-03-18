export const filterObject = (raw, allowedKeys) => {
  return Object.keys(raw)
    .filter(key => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
};
