function createCounter(){
    let count = 0 

    return function(){
        count+=1
        return count
    }
}

let count = createCounter()

console.log(count())  
console.log(count())  
console.log(count())  


let count2 = createCounter()

console.log(count2())
console.log(count2())

function createAdder(value){
    return function(num){
        return value + num 
    }
}

let add = createAdder(5)

console.log(add(5))
console.log(add(10))