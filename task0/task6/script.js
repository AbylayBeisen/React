function isEven(number){
    return number % 2 === 0 
}

const isEven = (number) => {
    return number % 2 === 0 
}

function getFullName(firstName, lastName){
    return `${firstName} ${lastName}`
}

function calculatePrice(price, quantity){
    return price * quantity
}

function calculateDiscount(price, percent){
    return price - (price * (percent / 100))
}

function getMax(a, b){
    if (a > b){
        return a
    }else{
        return b
    }
}