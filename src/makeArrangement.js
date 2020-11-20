const { json } = require("express");

const makeArrangements = (data, callback) => {
    // console.log(data.length);

    ///////// MAKING A LIST OF ABSENT TEACHERS
    let n = data.length - 1;
    let absentTeacher = data[n]['teachers'];

    //////// LIST OF TEACHERS OF EVERY CLASS 
    //////// AND ENTIRE TIME TABLE IN 2D ARRAY APART FROM ABSENT TEACHER
    let classTeachers = {};
    let timeTable = {};
    for(let i = 0; i<n;i++)
    {
        let numberOfKeys = Object.keys(data[0]).length;
        let numberOfPeriods = numberOfKeys - 2;
        let teacherCode = data[i]['Code '];

        let classes = [];
        for(let j = 1;j<=numberOfPeriods;j++)
        {
            classes.push(data[i][j]);

            if(data[i][j] !== '-') {
                if(classTeachers[data[i][j]]) {
                    let arr = classTeachers[data[i][j]];
                    arr.push(teacherCode);
                    classTeachers[data[i][j]] = arr;
                } else {
                    let arr = [];
                    arr.push(teacherCode);
                    classTeachers[data[i][j]] = arr;
                }
            };
        }
        timeTable[teacherCode] = classes;
    }
    // console.log(classTeachers);
    // console.log(timeTable);

    ///////// MAKING ARRANGEMENTS
    if(absentTeacher.length === 0) {
        callback('No Teachers are Absent!', undefined);
    } else {
        let arrangementResults = [];
        let numberOfAbsentee = absentTeacher.length;
        for(let i = 0;i < numberOfAbsentee;i++)
        {
            let arr = [];
            arr.push(absentTeacher[i]);
            let numberOfPeriods = timeTable[absentTeacher[i]].length;
            for(let j = 0;j < numberOfPeriods;j++)
            {
                if(timeTable[absentTeacher[i]][j] === '-') {
                    arr.push('-');
                } else {
                    let str = timeTable[absentTeacher[i]][j];
                    // console.log(absentTeacher[i]);
                    // console.log(str);
                    let flag = false;
                    for(let k = 0;k < classTeachers[str].length;k++) {
                        if(absentTeacher.indexOf(classTeachers[str][k]) === -1 && timeTable[classTeachers[str][k]][j] === '-') {
                            timeTable[classTeachers[str][k]][j] = str;
                            str = str + " # " +  classTeachers[str][k];
                            arr.push(str);
                            flag = true;
                            break;
                        }
                    }

                    if(!flag) {
                        for(let key in timeTable) {
                            if(timeTable.hasOwnProperty(key)) {
                                if(absentTeacher.indexOf(key) === -1 && timeTable[key][j] === '-') {
                                    timeTable[key][j] = str;
                                    str = str + " # " + key;
                                    arr.push(str);
                                    flag = true;
                                    break;
                                }
                            }
                        }
                    }

                    if(!flag) {
                        arr.push('Self');
                    }
                }
            }
            arrangementResults.push(arr);
        }
        // console.log(arrangementResults);
        callback(undefined, arrangementResults);
    }
}


module.exports = makeArrangements;

// let jsonData = '[{"1":"I A","2":"-","3":"I B","4":"II A","Name ":"Prashant","Code ":"P"},{"1":"II B","2":"II A","3":"-","4":"I B","Name ":"Apple","Code ":"AP"},{"1":"II A","2":"-","3":"I A","4":"-","Name ":"Mango","Code ":"M"},{"1":"-","2":"I A","3":"-","4":"-","Name ":"Tango","Code ":"T"},{"1":"-","2":"III A","3":"II A","4":"II B","Name ":"Charle","Code ":"C"},{"1":"I B","2":"I B","3":"-","4":"III A","Name ":"Delta","Code ":"D"},{"1":"III A","2":"-","3":"II B","4":"I A","Name ":"Alpha","Code ":"A"},{"1":"-","2":"II B","3":"III A","4":"-","Name ":"Beta","Code ":"B"},{"teachers":["A","B","C"]}]';
// let objData = JSON.parse(jsonData);

// makeArrangements(objData);