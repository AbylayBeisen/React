const numbers = [3, 7, 2, 10, 5]

let multiplied = numbers.map(num => num * 2)

console.log(multiplied)

let morethan5 = numbers.filter(num => num > 5)

console.log(morethan5)

let firstmore5 = numbers.find(num => num > 5)

console.log(firstmore5)

let Sum = numbers.reduce((sum, num) => sum + num, 0)

console.log(Sum)

let ten = numbers.includes(10)

console.log(ten)