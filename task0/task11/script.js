const user1 = { name: "Abylai", address: { city: "Almaty" } }
const user2 = { name: "Max" }

console.log(user1.address?.city ?? "City not specified")
console.log(user2.address?.city ?? "City not specified")

console.log(0 || "Default")
console.log("" || "Default")
console.log(false || "Default")
console.log(null || "Default")
console.log(undefined || "Default")

console.log(0 ?? "Default")
console.log("" ?? "Default")
console.log(false ?? "Default")
console.log(null ?? "Default")
console.log(undefined ?? "Default")

