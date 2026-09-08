const user = {
id: 1,
name: "Abylai",
age: 20,
address: {
    city: "Almaty",
    street: "Tole bi" 
}
}

console.log(user.name, user.address.city)

user.age = 21

console.log(user)

user.email = "test@user.kz"

console.log(user)

delete user.address.street 

console.log(user)

const{name, age} = user

console.log(name, age)

const{address: {city}} = user 

console.log(city)

const{name: userName} = user

console.log(userName)