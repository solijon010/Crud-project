var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  userName = document.getElementById("name"),
  age = document.getElementById("age"),
  city = document.getElementById("city"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  post = document.getElementById("post"),
  sDate = document.getElementById("sDate"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modalTitle = document.querySelector("#userForm .modal-title"),
  newUserBtn = document.querySelector(".newUser");

// LocalStorage'dan ma'lumotlarni olish
let getData = JSON.parse(localStorage.getItem("userProfile")) || [];

// Default 3 ta odam
const defaultUsers = [
  {
    picture: "profile.png",
    employeeName: "Solijon",
    employeeAge: "22",
    employeeCity: "Andijon",
    employeeEmail: "solijonikromov001@gmail.com",
    employeePhone: "12345678901",
    employeePost: "Developer",
    startDate: "2025-10-06",
  },
  {
    picture: "profile.png",
    employeeName: "Oypapuy",
    employeeAge: "27",
    employeeCity: "Toshkent",
    employeeEmail: "Oypapuy007@gmail.com",
    employeePhone: "98765432109",
    employeePost: "Designer",
    startDate: "2025-10-10",
  },
  {
    picture: "profile.png",
    employeeName: "Asadjon",
    employeeAge: "21",
    employeeCity: "Andijon",
    employeeEmail: "Asadbekkk@gmail.com",
    employeePhone: "11223344556",
    employeePost: "Manager",
    startDate: "2025-10-07",
  },
];

// Agar LocalStorage bo‘sh bo‘lsa, defaultUsers qo‘shiladi
if (getData.length === 0) {
  getData = defaultUsers;
  localStorage.setItem("userProfile", JSON.stringify(getData));
}

let isEdit = false,
  editId;

// Dastlabki ma'lumotlarni chiqarish
showInfo();

// New User tugmasi bosilganda
newUserBtn.addEventListener("click", () => {
  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Fill the Form";
  isEdit = false;
  imgInput.src = "profile.png"; // default rasm
  form.reset();
});

// Fayl input o‘zgarganda
file.onchange = function () {
  if (file.files[0].size < 3000000) {
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
      imgUrl = e.target.result;
      imgInput.src = imgUrl;
    };
    fileReader.readAsDataURL(file.files[0]);
  } else {
    alert("This file is too large!");
  }
};

// Foydalanuvchi ma'lumotlarini jadvalga chiqarish
function showInfo() {
  document
    .querySelectorAll(".employeeDetails")
    .forEach((info) => info.remove());

  getData.forEach((element, index) => {
    let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${
              element.picture
            }" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${
                  element.picture
                }', '${element.employeeName}', '${element.employeeAge}', '${
      element.employeeCity
    }', '${element.employeeEmail}', '${element.employeePhone}', '${
      element.employeePost
    }', '${
      element.startDate
    }')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${
      element.picture
    }', '${element.employeeName}', '${element.employeeAge}', '${
      element.employeeCity
    }', '${element.employeeEmail}', '${element.employeePhone}', '${
      element.employeePost
    }', '${
      element.startDate
    }')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
    userInfo.innerHTML += createElement;
  });
}

// Read Info
function readInfo(
  pic,
  name,
  ageVal,
  cityVal,
  emailVal,
  phoneVal,
  postVal,
  sDateVal
) {
  document.querySelector(".showImg").src = pic;
  document.querySelector("#showName").value = name;
  document.querySelector("#showAge").value = ageVal;
  document.querySelector("#showCity").value = cityVal;
  document.querySelector("#showEmail").value = emailVal;
  document.querySelector("#showPhone").value = phoneVal;
  document.querySelector("#showPost").value = postVal;
  document.querySelector("#showsDate").value = sDateVal;
}

// Edit Info
function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate) {
  isEdit = true;
  editId = index;
  imgInput.src = pic;
  userName.value = name;
  age.value = Age;
  city.value = City;
  email.value = Email;
  phone.value = Phone;
  post.value = Post;
  sDate.value = Sdate;

  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update The Form";
}

// Delete Info
function deleteInfo(index) {
  if (confirm("Are you sure want to delete?")) {
    getData.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(getData));
    showInfo();
  }
}

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const information = {
    picture: imgInput.src ? imgInput.src : "profile.png",
    employeeName: userName.value,
    employeeAge: age.value,
    employeeCity: city.value,
    employeeEmail: email.value,
    employeePhone: phone.value,
    employeePost: post.value,
    startDate: sDate.value,
  };

  if (!isEdit) {
    getData.push(information);
  } else {
    getData[editId] = information;
    isEdit = false;
  }

  localStorage.setItem("userProfile", JSON.stringify(getData));

  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Fill The Form";

  showInfo();
  form.reset();
  imgInput.src = "prpfile.png";
});
