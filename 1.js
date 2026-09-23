function CreateTask(name){
    let count = 0

    return {
    name: name,
    reset: function(){
        count = 0
    },
    getCount: function(){

    },

    run: function(){
        count++
        
        const delay = Math.floor(Math.random * 1000)

        return new Promise((resolve, reject)) => {
            setTimeout(())
        }
    }
    }
}