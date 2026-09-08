const students = [
    { id: 1, name: "Abylai", age: 20, grades: [85, 90, 92] },
    { id: 2, name: "Anna", age: 21, grades: [50, 60, 55] },
    { id: 3, name: "Max", age: 22, grades: [95, 88, 99] },
    { id: 4, name: "Sara", age: 19, grades: [40, 45, 50] },
    { id: 5, name: "John", age: 20, grades: [70, 75, 80] }
]

const getAverage = (grades) => {
    
    if (grades.length === 0) 
        return 0
    const sum = grades.reduce((total, grade) => total + grade, 0)
    return sum / grades.length
}

const getStudentAverage = (student) => getAverage(student.grades)

const getPassedStudents = (students) => {
    return students.filter(student => getStudentAverage(student) >= 60);
}

const getStudentNames = (students) => {
    return students.map(student => student.name);
}

const findStudent = (students, id) => {
    return students.find(student => student.id === id);
}

const getTopStudent = (students) => {
    return students.reduce((top, current) => {
        return getStudentAverage(current) > getStudentAverage(top) ? current : top
    })
}

const finalStudentData = students.map(student => {
    const avg = getStudentAverage(student)
    return {
        id: student.id,
        name: student.name,
        average: parseFloat(avg.toFixed(2)), 
        passed: avg >= 60
    }
})

console.log(getStudentNames(students))
console.log(getTopStudent(students).name)
console.log(getPassedStudents(students))
console.log(finalStudentData)