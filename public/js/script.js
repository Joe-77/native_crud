const signature = document.getElementById("signature");
const date = document.getElementById("date");
const password = document.getElementById("password");
const submitForm = document.getElementById("submit-form");
const overlay = document.createElement("div");
const addNewDevice = document.getElementById("add-new-device");
const parentForm = document.getElementById("parent_form");
const formTitle = document.getElementById("form_title");
const tableTbody = document.getElementById("table_body");
const sort = document.getElementById("sorted_device");
const listOfSorted = document.getElementById("options_sorted");
const sortedByActive = document.getElementById("sorted_by_active");
const sortedLatest = document.getElementById("sorted_latest");
const toast = document.getElementById("toast");
const search = document.getElementById("search_signature");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const search_signature = document.getElementById("search_signature");
const current_page = document.getElementById("current_page");
const total_page = document.getElementById("total_page");
const getDefaultLang = localStorage.getItem("zatca_translation" || "ar");

let data = JSON.parse(localStorage.getItem("data")) || [];

let filter_data = data;

let tmb;
let mood = "add";
let show = false;
let sorted = false;
let filterMood = "latest";

let currentPage = 1;
const itemsPerPage = 6;

// Events
submitForm.addEventListener("click", handleSubmitForm);
addNewDevice.addEventListener("click", showParentForm);
signature.addEventListener("keyup", toggleSubmitButton);
date.addEventListener("change", toggleSubmitButton);
password.addEventListener("keyup", toggleSubmitButton);
sort.addEventListener("click", handleSorted);
sortedByActive.addEventListener("click", sortedActive);
sortedLatest.addEventListener("click", handleSortedFromLatest);
next.addEventListener("click", increment);
search_signature.addEventListener("keyup", handlerSearch);

showData();
updatePaginationInfo();
// conditions

if (getDefaultLang === "en") {
  search.placeholder = "Find the signature...";
} else {
  search.placeholder = "ابحث عن التوقيع...";
}

// Create functions

function toggleSubmitButton() {
  if (
    date.value === "" ||
    signature.value === "" ||
    password.value.length < 6
  ) {
    submitForm.disabled = true;
  } else {
    submitForm.disabled = false;
  }
}

function handleSubmitForm(e) {
  e.preventDefault();

  const customData = {
    signature_email: signature.value,
    date: date.value,
    password: password.value,
    active: false,
  };
  if (mood === "add") {
    data.push(customData);

    // Save the data to localStorage
    localStorage.setItem("data", JSON.stringify(data));

    toaster("تم اضافة الجهاز بنجاح", "success");
  } else {
    data[tmb] = {
      signature_email: signature.value,
      date: date.value,
      password: password.value,
      active: data[tmb].active,
    };
    localStorage.setItem("data", JSON.stringify(data));
    toaster("تم تحديث البيانات بنجاح", "success");
  }

  remover();
  toggleSubmitButton();
  showData();
  updatePaginationInfo();
}

function updateStatus() {
  mood = "add";

  formTitle.textContent = "إضافة جهاز جديد";
  submitForm.textContent = "إضافة";
}

function showParentForm() {
  show = true;

  overlay.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "right-0",
    "bottom-0",
    "flex",
    "justify-center",
    "items-center",
    "bg-gray-500",
    "opacity-75"
  );

  document.body.appendChild(overlay);

  parentForm.classList.remove("top-[-500px]");
  parentForm.classList.add("top-10");

  overlay.onclick = () => {
    updateStatus();
    remover();
  };
}

function showData() {
  const currentItems = paginateData();

  tableTbody.innerHTML = `
    ${currentItems
      ?.map(
        (item, index) =>
          `
          <tr>
            <td class="py-2 px-4 border-b border-r text-center border-gray-200">
              ${(currentPage - 1) * itemsPerPage + index + 1}
            </td>
            <td class="py-2 px-4 border-b border-r text-center border-gray-200">
              ${item.signature_email}
            </td>
            <td class="py-2 px-4 border-b border-r text-center border-gray-200">
              ${
                item.active
                  ? `
              <div class="flex items-center justify-center gap-2">
                <span class="text-xs">Active</span>
                <span class="w-2 h-2 bg-green-600 rounded-full"></span>
              </div>
              `
                  : `
              <div class="flex items-center justify-center gap-2">
                <span class="text-xs">Inactive</span>
                <span class="w-2 h-2 bg-red-600 rounded-full"></span>
              </div>
              `
              }
            </td>
            <td class="py-2 px-4 border-b border-r text-center border-gray-200">
              ${item.date}
            </td>
            <td class="py-2 px-4 border-b border-r text-center border-gray-200">
              <button onclick="handleUpdateActive(${index})" class="border w-14 ${
            item.active ? "bg-blue-600" : ""
          } py-3 rounded-xl relative ">
                <span
                  class="absolute top-[2px] ${
                    item.active
                      ? "right-[2px] bg-white"
                      : "left-[2px] bg-gray-400"
                  } w-5 h-5 rounded-full"
                ></span>
              </button>
            </td>
            <td class="py-3 px-4 border-r text-center border-gray-200 flex items-center justify-center gap-3 border-b">
            <button onclick="handleUpdateForm(${
              (currentPage - 1) * itemsPerPage + index
            })" class="text-blue-600" id="update">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>  
            <button onclick="handleDelete(${
              (currentPage - 1) * itemsPerPage + index
            })" class="text-red-600" id="delete">
                <i class="fa-solid fa-trash"></i>
              </button>
              
            </td>
          </tr>
          `
      )
      .join("")}
  `;
}

function handleUpdateActive(index) {
  data[index].active = !data[index].active;
  localStorage.setItem("data", JSON.stringify(data));
  showData();
}

function handleDelete(index) {
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  showData();
  updatePaginationInfo();
}

function handleUpdateForm(index) {
  const lng = localStorage.getItem("zatca_translation" || "ar");

  // Update form logic here
  mood = "update";
  tmb = index;
  signature.value = data[index].signature_email;
  date.value = data[index].date;
  password.value = data[index].password;

  if (lng === "ar") {
    formTitle.textContent = "تحديث الجهاز";
    submitForm.textContent = "تحديث";
  } else {
    formTitle.textContent = "Update Device";
    submitForm.textContent = "Update";
  }

  showParentForm();
}

function clearForm() {
  date.value = "";
  signature.value = "";
  password.value = "";
}

function handleSorted() {
  sorted = !sorted;

  if (sorted === true) {
    sort.style.borderRightColor = "green";
    sort.style.borderRightWidth = "5px";
    sort.style.scale = "1.05";
  } else {
    sort.style.borderRightColor = "transparent";
    sort.style.borderRightWidth = "0px";
    sort.style.scale = "1";

    data = JSON.parse(localStorage.getItem("data"));
  }

  showData();
  handleShowList();
}

function handleShowList() {
  if (sorted) {
    listOfSorted.classList.remove("hidden");
    listOfSorted.classList.add("flex");
  } else {
    listOfSorted.classList.remove("flex");
    listOfSorted.classList.add("hidden");
  }
}
//
function handlerSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim();

  if (searchTerm) {
    filter_data = data.filter((item) =>
      item.signature_email.toLowerCase().includes(searchTerm)
    );
  } else {
    filter_data = [...data];
  }

  showData();
}

function sortedActive() {
  const filter = data.filter((e) => e.active === true);

  if (data.length === 0) {
    toaster("لا توجد اجهزة حاليا اضف الأن", "info");
    return;
  }

  if (filter.length === 0) {
    toaster("لا توجد اجهزة تم تفعيلها من قبل", "error");
    return;
  }

  sorted = false;
  data = filter;

  showData();
  handleShowList();
}
function handleSortedFromLatest() {
  if (data.length === 0) {
    toaster("لا توجد بيانات حاليا", "info");
    return;
  }

  sorted = false;

  if (filterMood === "latest") {
    sortedLatest.textContent = "الأقدم الي الأحدث";
    filterMood = "oldest";
  } else {
    sortedLatest.textContent = "الأحدث الي الأقدم";
    filterMood = "latest";
  }

  data = data.reverse();

  showData();
  handleShowList();
}

function toaster(msg, state) {
  if (state === "success") {
    toast.style.backgroundColor = "green";
    toast.classList.add("text-white");
  } else if (state === "error") {
    toast.style.backgroundColor = "red";
    toast.classList.add("text-white");
  } else {
    toast.style.backgroundColor = "gray";
    toast.classList.add("text-white");
  }

  toast.textContent = msg;

  toast.classList.remove("top-[-500px]");
  toast.classList.add("top-5");

  setTimeout(() => {
    toast.classList.remove("top-5");
    toast.classList.add("top-[-500px]");
  }, 2000);
}

function remover() {
  document.body.removeChild(overlay);
  parentForm.classList.remove("top-10");
  parentForm.classList.add("top-[-500px]");
  clearForm();
}

function handleShowMenuBar() {
  document.getElementById("menu_mobile").classList.remove("left-[-8000px]");
  document.getElementById("menu_mobile").classList.add("left-0");
}

function handleCloseMenu() {
  document.getElementById("menu_mobile").classList.remove("left-0");
  document.getElementById("menu_mobile").classList.add("left-[-8000px]");
}

// Pagination

function updatePagination() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  total_page.textContent = totalPages;
}

function paginateData() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filter_data.slice(startIndex, endIndex);
}

function updatePaginationInfo() {
  current_page.textContent = currentPage;
  updatePagination();
}

function increment() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    showData();
    updatePaginationInfo(); //
  }
}

function decrement() {
  if (currentPage > 1) {
    currentPage--;
    showData();
    updatePaginationInfo();
  }
}

next.addEventListener("click", increment);
prev.addEventListener("click", decrement);
