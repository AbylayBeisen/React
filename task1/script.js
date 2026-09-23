function createTask(name) {
    let count = 0

    return {
        name: name,
        
        getCount: function() {
            return count
        },
        
        reset: function() {
            count = 0
        },
        
        run: function() {
            count++
            const delay = Math.floor(Math.random() * (2000 - 500 + 1)) + 500
            
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const isFailed = Math.random() < 0.3
                    
                    if (isFailed) {
                        reject({ status: "Failed", time: delay, name: name })
                    } else {
                        resolve({ status: "Completed", time: delay, name: name })
                    }
                }, delay)
            })
        }
        
    }
    
}
const tasks = [
    createTask("Load Users"),
    createTask("Load Posts"),
    createTask("Load Comments")
]

const container = document.getElementById("tasks-container")

function renderTasks() {
    container.innerHTML = ""
    
    tasks.forEach((task, index) => {
        const div = document.createElement("div")
        div.style.marginBottom = "10px"
        
        div.innerHTML = `
            <strong>${task.name}</strong> 
            (Runs: <span id="count-${index}">${task.getCount()}</span>)
            - Status: <span id="status-${index}">Idle</span>
            <button onclick="runSingleTask(${index})">Run</button>
        `
        container.appendChild(div)
    })
}

async function runSingleTask(index) {
    const task = tasks[index]
    const statusEl = document.getElementById(`status-${index}`)
    const countEl = document.getElementById(`count-${index}`)
    
    statusEl.textContent = "Running..."
    statusEl.style.color = "orange"
    
    try {
        const result = await task.run()
        statusEl.textContent = `${result.status} (${result.time}ms)`
        statusEl.style.color = "green"
    } catch (error) {
        statusEl.textContent = `${error.status} (${error.time}ms)`
        statusEl.style.color = "red"
    }
    
    countEl.textContent = task.getCount()
}

renderTasks()

const resultMessage = document.createElement("h3")
document.body.appendChild(resultMessage)

document.getElementById("btn-concurrent").addEventListener("click", async () => {
    resultMessage.textContent = "Running all concurrently..."
    resultMessage.style.color = "orange"
    
    const startTime = performance.now()

    tasks.forEach((task, i) => {
        const statusEl = document.getElementById(`status-${i}`)
        statusEl.textContent = "Running..."
        statusEl.style.color = "orange"
    })

    const results = await Promise.allSettled(tasks.map(task => task.run()))

    results.forEach((result, i) => {
        const statusEl = document.getElementById(`status-${i}`)
        const countEl = document.getElementById(`count-${i}`)
        
        if (result.status === "fulfilled") {
            statusEl.textContent = `${result.value.status} (${result.value.time}ms)`
            statusEl.style.color = "green"
        } else {
            statusEl.textContent = `${result.reason.status} (${result.reason.time}ms)`
            statusEl.style.color = "red"
        }
        countEl.textContent = tasks[i].getCount()
    })

    const totalTime = Math.round(performance.now() - startTime)
    resultMessage.textContent = `All tasks finished concurrently in ${totalTime}ms`
    resultMessage.style.color = "blue"
})

document.getElementById("btn-sequential").addEventListener("click", async () => {
    resultMessage.textContent = "Running all sequentially..."
    resultMessage.style.color = "orange"
    
    const startTime = performance.now()

    for (let i = 0; i < tasks.length; i++) {
        const statusEl = document.getElementById(`status-${i}`)
        const countEl = document.getElementById(`count-${i}`)
        
        statusEl.textContent = "Running..."
        statusEl.style.color = "orange"
        
        try {
            const result = await tasks[i].run()
            statusEl.textContent = `${result.status} (${result.time}ms)`
            statusEl.style.color = "green"
        } catch (error) {
            statusEl.textContent = `${error.status} (${error.time}ms)`
            statusEl.style.color = "red"
        }
        
        countEl.textContent = tasks[i].getCount()
    }

    const totalTime = Math.round(performance.now() - startTime)
    resultMessage.textContent = `All tasks finished sequentially in ${totalTime}ms`
    resultMessage.style.color = "purple"
})

document.getElementById("btn-eventloop").addEventListener("click", () => {
    const output = document.getElementById("eventloop-output")
    
    output.textContent = "Expected Order:\n1. START (Sync)\n2. Async start (Sync)\n3. END (Sync)\n4. Promise 1 (Microtask)\n5. Async end (Microtask)\n6. Promise 2 (Microtask)\n7. Timer 1 (Task)\n8. Timer 2 (Task)\n\nActual Order:\n"
    
    const log = (msg) => {
        console.log(msg)
        output.textContent += msg + "\n"
    }
    
    log("START (Sync)")
    
    setTimeout(() => log("Timer 1 (Task)"), 0)
    
    Promise.resolve().then(() => log("Promise 1 (Microtask)"))
    
    async function asyncDemo() {
        log("Async start (Sync)")
        await Promise.resolve()
        log("Async end (Microtask)")
    }
    
    asyncDemo()
    
    Promise.resolve().then(() => log("Promise 2 (Microtask)"))
    
    setTimeout(() => log("Timer 2 (Task)"), 0)
    
    log("END (Sync)")
})