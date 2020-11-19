////////////////////// NAVBAR //////////////////
const navToggleButton = document.querySelector('.nav-toggle i');

navToggleButton.addEventListener('click', () => {
    let x = document.querySelector('.navbar-buttons');
    if(x.className === "navbar-buttons")
        x.className = "navbar-buttons show";
    else if(x.className === "navbar-buttons show")
        x.className = "navbar-buttons";

    if(navToggleButton.className === "fa fa-bars")
        navToggleButton.className = "fa fa-close";
    else
        navToggleButton.className = "fa fa-bars";
});


//////////////////////UPLOAD////////////////////
const realUploadBtn = document.querySelector('.real-upload-btn');
const uploadBtnTxt = document.querySelector('.upload-btn-txt a');
const tempUploadBtn = document.querySelector('.temp-upload-btn');
let selectedFile;

tempUploadBtn.addEventListener('click', () => {
    realUploadBtn.click();

    realUploadBtn.addEventListener('change', (event) => {
        selectedFile = event.target.files[0];
        if(realUploadBtn.value) {
            uploadBtnTxt.innerHTML = 
            realUploadBtn.value.replace(/^.*(\\|\/|\:)/, '');
        } else {
            uploadBtnTxt.innerHTML = "Select a timetable for today ... ";
        }
    });
});

////////////////////ABSENT ADD////////////////////
const addBtn = document.querySelector('.submit-btn');
const inputTxt = document.querySelector('.absentees input');
const teacherList = document.querySelector('.absent-teachers');
let teachers = [];

inputTxt.addEventListener('keyup', (event) => {
    if(event.keyCode === 13)
    {
        event.preventDefault();
        addBtn.click();
    }
});

addBtn.addEventListener('click', () => {
    if(inputTxt.value === "")
    {
        alert('Please Enter a Teacher Code before adding');
    } else {
        let name = inputTxt.value.toUpperCase();
        teachers.push(name);

        let listItem = document.createElement('li');
        listItem.textContent = name;
        teacherList.appendChild(listItem);
        inputTxt.value = "";
        console.log(teachers);
    }
});

////////////////////MAKE ARRANGEMENTS////////////////////
const arrBtn = document.querySelector('.make-arrangements');

async function arrange(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    });
    return response.json();
}

arrBtn.addEventListener('click', () => {
    if(selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, {type: 'binary'});
            // console.log(workbook);
            let sheet = workbook.SheetNames[0];
            let jsonObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            jsonObject.push({
                teachers: teachers
            });
            // console.log(jsonObject);
            console.log(JSON.stringify(jsonObject));
            const arrUrl = `${window.location.href}arrangement`;
            arrange(arrUrl, jsonObject);
            // 'popUpWindow','height=400,width=600,left=10,top=10,,scrollbars=yes,menubar=no'
            window.open(arrUrl,'popUpWindow','left=10,top=10,,scrollbars=yes,menubar=no');
        }
    }
});