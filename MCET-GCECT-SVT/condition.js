function x(score) {
    if(score> 50) {
        return "pass";
    } else {
        return "Fail"
    }
}
//multi
function y(marks) {
    if(marks>=90) {
        return "grade a";
    }  else if(marks>=80) {
        return "grade b";
    }else {
        return "grade c";
    }
}
//terneary opetor
function z(score) {
    return (score >=50) ? "Pass" :"Fail";
}
module.exports = {
    x,y,z
}