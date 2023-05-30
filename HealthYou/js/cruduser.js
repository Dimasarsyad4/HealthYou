var ModUserId = document.getElementById("userIdMod");
var ModFirstName = document.getElementById("firstNameMod");
var ModLastName = document.getElementById("lastNameMod");
var ModEmailUser = document.getElementById("emailUserMod");
var ModPhoneUser = document.getElementById("phoneUserMod");
var ModAge = document.getElementById("ageMod");

var BTNmodAdd = document.getElementById("AddModBtn");
var BTNmodUpd = document.getElementById("UpdModBtn");
var BTNmodDel = document.getElementById("DelModBtn");

var searchBar = document.getElementById("SearchBar");
var categorySelected = document.getElementById("CategorySelected");
var searchButton = document.getElementById("SearchBtn");

let userNo = 0;

function selectAllData() {
  // empty tbody
  const tbody = document.querySelector("#tbody1");
  tbody.innerHTML = "";
  firebase
    .database()
    .ref("users")
    .once("value", (allRecords) => {
      for (const key in allRecords.val()) {
        const user = allRecords.val()[key];
        const firstName = user.firstName;
        const lastName = user.lastName;
        const emailUser = user.email;
        const phoneUser = user.phone;
        const age = user.age;

        console.log(key, user);

        AddItemsToTable(
          key,
          ++userNo,
          firstName,
          lastName,
          emailUser,
          phoneUser,
          age
        );
      }
    });
}

function AddItemsToTable(
  userId,
  userNo,
  firstName,
  lastName,
  emailUser,
  phoneUser,
  age
) {
  const trow = document.createElement("tr");
  trow.innerHTML = `
    <td hidden>${userId}</td>
    <td>${userNo}</td>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${emailUser}</td>
    <td>${phoneUser}</td>
    <td>${age}</td>
    <td>
        <button type="button" class="addBtn btn btn-primary my-2" data-toggle="modal" data-target="#exampleModalCenter">Add</button>
        <button type="button" class="EditBtn btn btn-primary my-2" data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
    </td>
  `;
  tbody1.appendChild(trow);
  addBtnEvent();
  editBtnEvent();
}

function FillTboxes(user) {
  if (user == null) {
    ModFirstName.value = "";
    ModLastName.value = "";
    ModEmailUser.value = "";
    ModPhoneUser.value = "";
    ModAge.value = "";
    BTNmodAdd.style.display = "inline-block";
    BTNmodUpd.style.display = "none";
    BTNmodDel.style.display = "none";
  } else {
    ModUserId.value = user.userId;
    ModFirstName.value = user.firstName;
    ModLastName.value = user.lastName;
    ModEmailUser.value = user.emailUser;
    ModPhoneUser.value = user.phoneUser;
    ModAge.value = user.age;
    BTNmodAdd.style.display = "none";
    BTNmodUpd.style.display = "inline-block";
    BTNmodDel.style.display = "inline-block";
  }
}

function addBtnEvent() {
  const addBtn = document.querySelectorAll(".addBtn");
  addBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      FillTboxes(null);
    });
  });
}

function editBtnEvent() {
  const editBtn = document.querySelectorAll(".EditBtn");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const user = {
        userId: e.target.parentElement.parentElement.children[0].innerText,
        firstName: e.target.parentElement.parentElement.children[2].innerText,
        lastName: e.target.parentElement.parentElement.children[3].innerText,
        emailUser: e.target.parentElement.parentElement.children[4].innerText,
        phoneUser: e.target.parentElement.parentElement.children[5].innerText,
        age: e.target.parentElement.parentElement.children[6].innerText,
      };
      console.log(user);
      FillTboxes(user);
    });
  });
}

function AddUser() {
  if (
    ModFirstName.value == "" ||
    ModLastName.value == "" ||
    ModEmailUser.value == "" ||
    ModPhoneUser.value == "" ||
    ModAge.value == ""
  ) {
    alert("Please fill all the fields");
  } else {
    firebase
      .database()
      .ref("users")
      .child(ModFirstName.value)
      .set({
        firstName: ModFirstName.value,
        lastName: ModLastName.value,
        email: ModEmailUser.value,
        phone: ModPhoneUser.value,
        age: ModAge.value,
      })
      .then(() => {
        alert("The data successfully added!");
        selectAllData();
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed to add new data!");
        console.log(error);
      });
  }
}

function UpdUser() {
  if (
    ModFirstName.value == "" ||
    ModLastName.value == "" ||
    ModEmailUser.value == "" ||
    ModPhoneUser.value == "" ||
    ModAge.value == ""
  ) {
    alert("Please fill all the fields");
  } else {
    firebase
      .database()
      .ref("users")
      .child(ModUserId.value)
      .update({
        firstName: ModFirstName.value,
        lastName: ModLastName.value,
        email: ModEmailUser.value,
        phone: ModPhoneUser.value,
        age: ModAge.value,
      })
      .then(() => {
        alert("The data successfully updated!");
        selectAllData();
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed to update data!");
        console.log(error);
      });
  }
}

function DelUser() {
  firebase
    .database()
    .ref("users")
    .child(ModUserId.value)
    .remove()
    .then(() => {
      alert("The data successfully deleted!");
      selectAllData();
      window.location.reload();
    })
    .catch((error) => {
      alert("Failed to delete data!");
      console.log(error);
    });
}

BTNmodAdd.addEventListener("click", AddUser);
BTNmodUpd.addEventListener("click", UpdUser);
BTNmodDel.addEventListener("click", DelUser);

selectAllData();

