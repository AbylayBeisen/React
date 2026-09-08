const numbers = [10, 20, 30, 40]

let [first, second] = numbers

console.log(first, second)

const user = { id: 1, name: "Anna", age: 21 }

let {name, age} = user

console.log(name, age)

let copy = [...numbers, 50]

let copyuser = {...user , age: 22, email: "email"}

console.log(copy)
console.log(copyuser)

let combo = [60,70]
let comb = [...numbers, ...combo]

console.log(comb)

function sum(...numbers){
    return numbers.reduce((sums, num) => sums + num, 0)
}

console.log(sum(1,2))
console.log(sum(1,2,3,4))