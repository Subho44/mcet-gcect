const multifun = require('./mutifun');
const condition = require('./condition');
const stringmsg = require('./stringmsg');
const arrowmultifun = require('./arrowmultifun');
const alluser = require('./alluser');
const  {joinarray,joinobj} = require('./spreadutil');

const std = [1,2,3];
const teacher = [40,60,45];
const faculty = [50,70,48];
const result = joinarray(std,teacher,faculty);
const obj1= {name:'virat',age:36};
const obj2 = {movie:'saiyarra',location:'delhi'};
const mergedobj = joinobj(obj1,obj2);

console.log(result);
console.log(mergedobj);
console.log(alluser());
console.log(arrowmultifun.add(4,8));
console.log(arrowmultifun.square(8));
const name = "raj";
const age = 30;
const city = "kolkata";
const msg = stringmsg.getmsg(name,age,city);
console.log(msg);
console.log("pi: ",multifun.pi);
console.log("sum: ",multifun.add(5,6));
console.log("multi: ",multifun.multi(6,5));

console.log("singel: ",condition.x(70));
console.log("multiple: ",condition.y(30));
console.log("socre: ",condition.z(20));

