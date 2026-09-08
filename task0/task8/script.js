const message = "global"

function Mess(){
    const message = "function"
    console.log(message)
    if(true){
       const message = "block"
        console.log(message)
    }
}

Mess()
console.log(message)
