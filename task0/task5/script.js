const original = {name: "Alice", score: 10}

copy = original 

copy.score = 11

console.log(original)

let newcopy = {...original}

console.log(newcopy)

newcopy.score = 14

console.log(newcopy)

const user = { name: "Alice", address: { city: "Almaty" } }

let newuser = {...user}

// newuser.address.city = "Шымкент" 

console.log(user)

console.log(newuser)

let correctCopy = structuredClone(user)

correctCopy.address.city = "Шымкент"

console.log(user)

console.log(correctCopy)