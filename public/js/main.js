// Declare variables

const customerArabicName = document.getElementById("arabic_name");
const customerEnglishName = document.getElementById("english_name");
const taxNumber = document.getElementById("tax_number");
const typeOfIdentifier = document.getElementById("type");
const typeOfInvoice = document.getElementById("invoices");
const arabicAddress = document.getElementById("arabic_address");
const englishAddress = document.getElementById("english_address");
const arabicDistrict = document.getElementById("arabic_district");
const englishDistrict = document.getElementById("english_district");
const arabicCountry = document.getElementById("arabic_country");
const englishCountry = document.getElementById("english_country");
const secondIdentifier = document.getElementById("second_identifier");
const buildingNumber = document.getElementById("building_number");
const postalCode = document.getElementById("postal_code");
const mailboxNumber = document.getElementById("mailbox_number");
const select = document.getElementById("country_select");
const sort = document.getElementById("sorted_device");
const btnAddNewCustomer = document.getElementById("add-new-customer");
const parentForm = document.getElementById("parent_form");
const closeForm = document.getElementById("close_customer_form");
const submitForm = document.getElementById("submit-form");
const formTitle = document.getElementById("form_title");
const search = document.getElementById("search_input");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current_page = document.getElementById("current_page");
const total_page = document.getElementById("total_page");

let customersData = JSON.parse(localStorage.getItem("customers_data")) || [];
let filter_data = customersData;

let mood = "add";
let defaultCountry = "مصر";
let sorted = false;
let tmb;
let overlay;

let currentPage = 1;
const itemsPerPage = 6;

// Events

btnAddNewCustomer.addEventListener("click", handleShowForm);
closeForm.addEventListener("click", handleCloseForm);
submitForm.addEventListener("click", handleSubmit);
select.addEventListener("change", (e) => {
  defaultCountry = e.target.value;
});
customerArabicName.addEventListener("keyup", toggleSubmitButton);
customerEnglishName.addEventListener("keyup", toggleSubmitButton);
taxNumber.addEventListener("keyup", toggleSubmitButton);
typeOfIdentifier.addEventListener("keyup", toggleSubmitButton);
typeOfInvoice.addEventListener("keyup", toggleSubmitButton);
arabicAddress.addEventListener("keyup", toggleSubmitButton);
englishAddress.addEventListener("keyup", toggleSubmitButton);
arabicDistrict.addEventListener("keyup", toggleSubmitButton);
englishDistrict.addEventListener("keyup", toggleSubmitButton);
arabicCountry.addEventListener("keyup", toggleSubmitButton);
englishCountry.addEventListener("keyup", toggleSubmitButton);
secondIdentifier.addEventListener("keyup", toggleSubmitButton);
buildingNumber.addEventListener("keyup", toggleSubmitButton);
postalCode.addEventListener("keyup", toggleSubmitButton);
mailboxNumber.addEventListener("keyup", toggleSubmitButton);
sort.addEventListener("click", handleSorted);
search.addEventListener("keyup", handleSearch);

showData();
updatePaginationInfo();
// Declarations Functions

function handleShowForm() {
  overlay = document.createElement("div");

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

  parentForm.classList.remove("top-[-8000px]");
  parentForm.classList.add("top-5");
  document.body.appendChild(overlay);

  if (checkLang()) {
    formTitle.textContent = "إضافة عميل جديد";
    submitForm.textContent = "إضافة";
  } else {
    formTitle.textContent = "Add New Customer";
    submitForm.textContent = "Add";
  }

  overlay.addEventListener("click", handleCloseForm);
}

function handleCloseForm() {
  parentForm.classList.remove("top-5");
  parentForm.classList.add("top-[-8000px]");
  document.body.removeChild(overlay);
  submitForm.disabled = true;
  updateStatus();
  clearForm();
}

function toggleSubmitButton() {
  if (
    customerArabicName.value === "" ||
    customerEnglishName.value === "" ||
    taxNumber.value === "" ||
    typeOfIdentifier.value === "" ||
    typeOfInvoice.value === "" ||
    arabicAddress.value === "" ||
    englishAddress.value === "" ||
    arabicDistrict.value === "" ||
    englishDistrict.value === "" ||
    arabicCountry.value === "" ||
    englishCountry.value === "" ||
    secondIdentifier.value === "" ||
    buildingNumber.value === "" ||
    postalCode.value === "" ||
    mailboxNumber.value === ""
  ) {
    submitForm.disabled = true;
  } else {
    submitForm.disabled = false;
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const customData = {
    arabic_customer_name: customerArabicName.value,
    english_customer_name: customerEnglishName.value,
    tax_number: taxNumber.value,
    type_identifier: typeOfIdentifier.value,
    type_invoice: typeOfInvoice.value,
    arabic_address: arabicAddress.value,
    english_address: englishAddress.value,
    arabic_district: arabicDistrict.value,
    english_district: englishDistrict.value,
    arabic_country: arabicCountry.value,
    english_country: englishCountry.value,
    second_identifier: secondIdentifier.value,
    building_number: buildingNumber.value,
    postal_code: postalCode.value,
    mailbox_number: mailboxNumber.value,
    country: defaultCountry,
  };

  if (mood === "add") {
    customersData.push(customData);
    localStorage.setItem("customers_data", JSON.stringify(customersData));
    toaster("تم اضافة العميل بنجاح", "success");
  } else {
    customersData[tmb] = customData;
    localStorage.setItem("customers_data", JSON.stringify(customersData));
    tmb = null;
    toaster("تم تحديث بيانات العميل بنجاح", "success");
  }

  handleCloseForm();
  showData();
}

function showData() {
  const currentItems = paginateData();

  const tableBody = document.getElementById("table_body");
  tableBody.innerHTML = `
  ${currentItems
    .map((e, index) => {
      return `
      <tr>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${index + 1}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.arabic_customer_name}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.english_customer_name}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.tax_number}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.type_identifier}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.type_invoice}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.arabic_address}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.english_address}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.arabic_district}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.english_district}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.arabic_country}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.english_country}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.second_identifier}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.building_number}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.postal_code}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.mailbox_number}
        </td>
        <td class="py-2 px-4 border-b border-r text-center border-gray-200">
          ${e.country}
        </td>
        <td class="py-2 px-4 border-r text-center border-gray-200 flex items-center justify-center gap-3 border-b">
          <button
            onclick="handleDelete(${index})"
            class="text-red-600"
            id="delete"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
          <button
            onclick="handleUpdateForm(${index})"
            class="text-blue-600"
            id="update"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
      `;
    })
    .join("")}
  `;
}

function handleDelete(index) {
  customersData.splice(index, 1);
  localStorage.setItem("customers_data", JSON.stringify(customersData));
  showData();
}

function handleUpdateForm(index) {
  // Update form logic here

  mood = "update";
  tmb = index;

  customerArabicName.value = customersData[tmb].arabic_customer_name;
  customerEnglishName.value = customersData[tmb].english_customer_name;
  taxNumber.value = customersData[tmb].tax_number;
  typeOfIdentifier.value = customersData[tmb].type_identifier;
  typeOfInvoice.value = customersData[tmb].type_invoice;
  arabicAddress.value = customersData[tmb].arabic_address;
  englishAddress.value = customersData[tmb].english_address;
  arabicDistrict.value = customersData[tmb].arabic_district;
  englishDistrict.value = customersData[tmb].english_district;
  arabicCountry.value = customersData[tmb].arabic_country;
  englishCountry.value = customersData[tmb].english_country;
  secondIdentifier.value = customersData[tmb].second_identifier;
  buildingNumber.value = customersData[tmb].building_number;
  postalCode.value = customersData[tmb].postal_code;
  mailboxNumber.value = customersData[tmb].mailbox_number;
  select.value = customersData[tmb].country;

  handleShowForm();

  if (checkLang()) {
    formTitle.textContent = "تحديث بيانات العميل";
    submitForm.textContent = "تحديث";
  } else {
    formTitle.textContent = "Update Customer Data";
    submitForm.textContent = "Update";
  }
}

function handleSorted() {
  sorted = !sorted;

  if (customersData.length === 0) {
    toaster("لا توجد بيانات حاليا ليتم ترتيبها", "error");
    return;
  }

  if (sorted) {
    sort.style.borderRightColor = "green";
    sort.style.borderRightWidth = "5px";
    sort.style.scale = "1.05";
  } else {
    sort.style.borderRightColor = "#ddd";
    sort.style.borderRightWidth = "1px";
    sort.style.scale = "1";
  }

  customersData.reverse();
  showData();
}

function updateStatus() {
  mood = "add";

  formTitle.textContent = "إضافة جهاز جديد";
  submitForm.textContent = "إضافة";
}

function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim();

  if (searchTerm) {
    filter_data = customersData.filter(
      (e) =>
        e.english_customer_name.toLowerCase().includes(searchTerm) ||
        e.arabic_customer_name.toLowerCase().includes(searchTerm)
    );
  } else {
    filter_data = [...customersData];
  }

  showData();
}

function checkLang() {
  const lng = localStorage.getItem("zatca_translation" || "ar");

  return lng === "ar" ? true : false;
}

function clearForm() {
  customerArabicName.value = "";
  customerEnglishName.value = "";
  taxNumber.value = "";
  typeOfIdentifier.value = "";
  typeOfInvoice.value = "";
  arabicAddress.value = "";
  englishAddress.value = "";
  arabicDistrict.value = "";
  englishDistrict.value = "";
  arabicCountry.value = "";
  englishCountry.value = "";
  secondIdentifier.value = "";
  buildingNumber.value = "";
  postalCode.value = "";
  mailboxNumber.value = "";
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

// Pagination

function updatePagination() {
  const totalPages = Math.ceil(customersData.length / itemsPerPage);
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
  const totalPages = Math.ceil(customersData.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    showData();
    updatePaginationInfo();
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
