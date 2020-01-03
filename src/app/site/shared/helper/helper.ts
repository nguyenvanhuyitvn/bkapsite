export class Helper {
 compareObjectArray(key, order= 'asc') {
   return function innerSort(a,b){
     if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)){
       return 0;
     }
     const varA = (typeof a[key] === 'string')? a[key].toUpperCase():a[key];
     const varB = (typeof b[key] === 'string')? b[key].toUpperCase():b[key];
     let comparision = 0;
     if(varA > varB){
       comparision = 1;
     }else if(varA < varB){
       comparision = -1;
     }
     return (
       (order === 'desc') ? (comparision * -1) : comparision
     );
   };
 }
 }
