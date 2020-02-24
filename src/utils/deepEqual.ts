export default function deepEqual(a, b) {
   if (typeof a !== 'object' ||
       typeof b !== 'object' ||
       a === null || b === null) {
     return a === b;
   }

   if (Object.keys(a).length !== Object.keys(b).length) {
      return false
   }
   for (const prop in a) {
      if (!(prop in b) || !deepEqual(a[prop], b[prop])) {
         return false
      }
   }
   return true
}
