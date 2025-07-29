  const joinarray = (arr1,arr2,arr3) => {
    return [...arr1,...arr2,...arr3];
}
 const joinobj = (obj1,obj2) => {
    return {...obj1,...obj2};
}
module.exports = {
    joinarray,joinobj
}