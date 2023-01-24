import Student from "./student.js";

let $form = document.querySelector(".new-record");
let memory = [];
let record = {};
let filters = document.querySelectorAll(".options-btn");
let headers = document.querySelectorAll(".header-field");
let column = "name";
let filter = "faculty";
let filterText = document.querySelector(".filters-text");
let filterEnable = document.querySelectorAll(".options-btn");
let today = new Date();

let direction = true;
let $table = document.querySelector(".records-container");

let operatingMemory = [...memory];

function saveList(arr) {
  localStorage.setItem("memory", JSON.stringify(arr));
}
function createRecord(obj) {
  let $name = document.querySelector(".name-input");
  let $midName = document.querySelector(".midname-input");
  let $surname = document.querySelector(".surname-input");
  let $birthDate = document.querySelector(".birthdate-input");
  let $admission = document.querySelector(".admission-input");
  let $facSrc = document.querySelector(".faculty-input");
  let person = new Student(
    $name.value,
    $midName.value,
    $surname.value,
    $admission.value,
    $birthDate.value,
    $facSrc.value
  );

  obj = {
    name: person.fullName,
    faculty: person.faculty,
    birthDate: person.getAge($birthDate.value),
    studying: person.studyingOrNot(),
  };

  memory.push(obj);
  saveList(memory);
  console.log(memory);
  return memory, obj;
}

function createTable(obj) {
  let $row = document.createElement("tr");
  let $fullName = document.createElement("td");
  let $faculty = document.createElement("td");
  let $age = document.createElement("td");
  let $studying = document.createElement("td");
  $fullName.textContent = obj.name;
  $faculty.textContent = obj.faculty;
  $age.textContent = obj.birthDate;
  $studying.textContent = obj.studying;

  $row.append($fullName);
  $row.append($faculty);
  $row.append($age);
  $row.append($studying);
  $row.classList.add("table-row");
  $fullName.classList.add("table-field", "name-field");
  $faculty.classList.add("table-field", "faculty-field");
  $age.classList.add("table-field", "age-field");
  $studying.classList.add("table-field", "studying-field");

  return $row;
}

function fillInTable(arr, func) {
  $table.innerHTML = "";
  arr = [...memory];
  console.log(arr);
  arr = func;
  for (let item of arr) {
    $table.append(createTable(item));
  }

  return arr;
}

function noSort(arr) {
  return arr;
}

function sortTable(arr, prop, dir) {
  arr = [...memory];
  return arr.sort(function (studentA, studentB) {
    if (
      !dir == false
        ? studentA[prop] < studentB[prop]
        : studentA[prop] > studentB[prop]
    )
      return -1;
  });
}

function gradFilter(arr, start, end) {
  $table.innerHTML = "";
  arr = [];
  for (let record of memory) {
    let option = record["studying"].slice(start, end);
    if (option.includes(filterText.value)) {
      arr.push(record);

      fillInTable(arr, noSort(arr));
    }
  }
  return arr;
}

function regfilter(arr, filter) {
  $table.innerHTML = "";
  arr = [];
  for (let record of memory) {
    if (record[filter].includes(filterText.value)) {
      arr.push(record);

      fillInTable(arr, noSort(arr));
    }
  }
  return arr;
}

document.addEventListener("DOMContentLoaded", function () {
  // memory = localStorage.getItem('memory');
  let localData = localStorage.getItem("memory");

  if (localData !== null && localData !== "") {
    memory = JSON.parse(localData);
  }

  fillInTable(memory, noSort(memory));
  console.log(memory);
});

// createRecord(record);
// fillInTable(memory,noSort(memory));

const validation = new JustValidate("#form", {
  errorFieldCssClass: "is-invalid",
  errorLabelStyle: {
    fontSize: "14px",
    color: "#dc3545",
  },
  tooltip: {
    position: "bottom",
  },
  focusInvalidField: true,
  lockForm: true,
});

validation
  .addField("#surname", [
    {
      rule: "required",
      errorMessage: "Field is required",
    },
  ])
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Field is required",
    },
  ])
  .addField("#mid-name", [
    {
      rule: "required",
      errorMessage: "Field is required",
    },
  ])
  .addField("#birth-date", [
    {
      rule: "required",
      errorMessage: "Field is required",
    },
    // {
    //   plugin: JustValidatePluginDate(() => ({

    //     format: 'dd.MM.yyyy',
    //     isBefore: '04.12.2022',
    //     isAfter: '01.01.1900',

    //   })),
    //   errorMessage: 'Date should be between 01.01.1900 and actual date',

    // },
  ])
  .addField("#admission", [
    {
      rule: "required",
      errorMessage: "Field is required",
    },
    {
      rule: "minNumber",
      value: 2000,
      errorMessage: "value should be more than 2000",
    },
    {
      rule: "maxNumber",
      value: today.getFullYear(),
      errorMessage: "value should be no more than actual year",
    },
  ])
  .addField("#faculty", [
    {
      rule: "required",
      errorMessage: "Field is required",
    },
  ])
  .onSuccess((e) => {
    e.preventDefault();
    createRecord(record);
    fillInTable(memory, noSort(memory));
    $form.reset();
  });

headers.forEach((el) => {
  el.addEventListener("click", function () {
    column = this.dataset.column;
    direction = !direction;
    fillInTable(operatingMemory, sortTable(operatingMemory, column, direction));
  });
});

filterEnable.forEach((el) => {
  el.addEventListener("click", function () {
    console.log(filterEnable);

    let filter = this.dataset.filter;
    console.log(filter);

    switch (filter) {
      case "start-studying":
        gradFilter(operatingMemory, 0, 4);
        break;
      case "end-studying":
        gradFilter(operatingMemory, 5, 9);
        break;
      case "name": //(*)
      case "faculty":
        regfilter(operatingMemory, filter);
    }
  });
});

filterText.addEventListener("keyup", function () {
  console.log(filterEnable);
  if (filterText.value !== 0) {
    console.log(filter);
    for (let value of filters) {
      if (value.checked) {
        filter = value.dataset.filter;

        switch (filter) {
          case "start-studying":
            console.log(operatingMemory);
            gradFilter(operatingMemory, 0, 4);
            break;
          case "end-studying":
            console.log(operatingMemory);
            gradFilter(operatingMemory, 5, 9);
            break;
          case "name": //(*)
          case "faculty":
            console.log(operatingMemory);
            regfilter(operatingMemory, filter);
        }
      }
    }
  } else {
    fillInTable(arr, noSort(arr));
  }
});
