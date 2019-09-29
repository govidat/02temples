// define a mixin objecta
// now this is not used as the code has been put in the main.js
// export const fn_desc = {
//
//   methods: {
//     // to use a method within a method mention it as this.
//
//     isObject: function (item) {
//         return (item && typeof item === 'object' && !Array.isArray(item));
//     },
//
//     mergeDeep: function (target, ...sources) {
//
//     //   // target is mutated
//     //   if (!sources.length) return target;
//     //   const source = sources.shift();
//     //
//     //   if (this.isObject(target) && this.isObject(source)) {
//     //     for (const key in source) {
//     //       if (this.isObject(source[key])) {
//     //         if (!target[key]) Object.assign(target, { [key]: {} });
//     //         this.mergeDeep(target[key], source[key]);
//     //       } else {
//     //         Object.assign(target, { [key]: source[key] });
//     //       }
//     //     }
//     //   }
//     //
//     //   return this.mergeDeep(target, ...sources);
//     // }
//
//     // target is not mutated
//       let output = Object.assign({}, target);
//       if (!sources.length) return target;
//       const source = sources.shift();
//
//       if (this.isObject(target) && this.isObject(source)) {
//         Object.keys(source).forEach(key => {
//           if (this.isObject(source[key])) {
//             if (!(key in target))
//               Object.assign(output, { [key]: source[key] });
//             else
//               output[key] = this.mergeDeep(target[key], source[key]);
//           } else {
//           Object.assign(output, { [key]: source[key] });
//           }
//         });
//       }
//       return output;
//     }
//
//   }
// }

// import this in the required component:

// import { fn_desc } from './myMixin'
//
// export default {
//   mixins: [fn_desc],
//
//   data () { ....
