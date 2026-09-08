const arr = [{
    id: 1,
    name: "Anna",
    grade: 85
},
{
    id: 2,
    name: "John",
    grade: 62
},
{
    id: 3,
    name: "Sara",
    grade: 91
},
{
    id: 4,
    name: "Mike",
    grade: 55
}
]

let seventy = arr.filter(num => num.grade >= 70)

console.log(seventy)

let names = arr.map(student => student.name)

console.log(names)

let idthree = arr.find(student => student.id==3)

console.log(idthree)

let highest = arr.reduce((student, high)=> {
    if (student.grade > high.grade){
        return student
    }else{
        return high
    }
})

console.log(highest)

let avg = arr.reduce((average, student) => average + student.grade, 0)

let a = avg/arr.length

console.log(a)

const newarr = arr.map(student=> {
    return {
        id: student.id,
        name: student.name,
        grade: student.grade,
        passed: student.grade >= 60
    }
})

console.log(newarr)