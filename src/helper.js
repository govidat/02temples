// this is directly called in the store.js
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

  // target is mutated
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

// target is not mutated

// export function mergeDeep(target, ...sources) {
//   let output = Object.assign({}, target);
//
//   if (!sources.length) return target;
//   const source = sources.shift();
//
//   if (isObject(target) && isObject(source)) {
//     Object.keys(source).forEach(key => {
//       if (isObject(source[key])) {
//         if (!(key in target))
//           Object.assign(output, { [key]: source[key] });
//         else
//           output[key] = mergeDeep(target[key], source[key]);
//       } else {
//         Object.assign(output, { [key]: source[key] });
//       }
//     });
//   }
//   return output;
// }
