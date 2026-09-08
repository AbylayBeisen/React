let StudentName = "Абылай"
let Age = "20"
let isActive = true 

let courses = ["Реакт", "Физика"]

let address = {
    city: "Алматы", 
    street: "Толе би"
}

console.log(StudentName, typeof StudentName)
console.log(isActive, typeof isActive)

let house 
let car = null 

console.log(house, typeof house)
console.log(car, typeof car)

let sentence = `Студент ${StudentName}, которому ${Age} лет, учится в ${address.city}, по улице ${address.street}`

console.log(sentence)