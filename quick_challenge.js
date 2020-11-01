const students = {
    "students": [
        {
            "name": "Lulu Gearside",
            "class": "art",
            "attended": 35
        },
        {
            "name": "Matthew Milham",
            "class": "art",
            "attended": 11
        },
        {
            "name": "Dany Dufner",
            "class": "biology",
            "attended": 12
        },
        {
            "name": "Jeremy Doyle",
            "class": "biology",
            "attended": 3
        },
        {
            "name": "Tim O'Connor",
            "class": "biology",
            "attended": 10
        },
        {
            "name": "Charlie Wang",
            "class": "french",
            "attended": 12
        }
    ]
};

const calculation = students => {
    let output = {};
    let class_attended = {};
    students.students.forEach(student => {
        if (!(student.class in output)) {
            output[student.class] = {
                'total': student.attended,
                'average': student.attended
            };
            class_attended[student.class] = 1;
        } else {
            class_attended[student.class] += 1;
            output[student.class]['total'] += student.attended;
            output[student.class]['average'] = Math.floor(output[student.class]['total'] / class_attended[student.class]);
        }
    });
    return output;
};

console.log(calculation(students));