function add(a,b){
    return a+b
}
function multiply(a, b){
    return a*b
}
function calculate(a,b, operation){
return operation(a,b)
}

console.log(calculate(5, 3, add))
console.log(calculate(5, 3, multiply))