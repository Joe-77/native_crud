// Declare variables
const invoice_number = document.getElementById("invoice_number");
const system_invoice_number = document.getElementById("system_invoice_number");
const invoice_date = document.getElementById("invoice_date");
const delivery_date = document.getElementById("delivery_date");
const max_delivery_date = document.getElementById("max_delivery_date");
const total_pay = document.getElementById("total_pay");
const invoice_total = document.getElementById("invoice_total");
const tax_total = document.getElementById("tax_total");
const invoice_net = document.getElementById("invoice_net");
const total_plus_tax = document.getElementById("total_plus_tax");
const payed_cash = document.getElementById("payed_cash");
const payed_visa = document.getElementById("payed_visa");
const payed_bank = document.getElementById("payed_bank");
const invoice_type = document.getElementById("invoice_type");
const left_amount = document.getElementById("left_amount");
const vat_category_code = document.getElementById("vat_category_code");
const vat_category_sub_type = document.getElementById("vat_category_sub_type");
const return_reason = document.getElementById("return_reason");
const discount = document.getElementById("discount");
const parentForm = document.getElementById("parent_form");
const btnAddNewCustomer = document.getElementById("add-new-customer");
const closeForm = document.getElementById("close_customer_form");
const submitForm = document.getElementById("submit-form");
const toast = document.getElementById("toast");
const formTitle = document.getElementById("form_title");
const filter_by_date = document.getElementById("filter_by_date");
const sort = document.getElementById("sorted_device");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current_page = document.getElementById("current_page");
const total_page = document.getElementById("total_page");
let documentsData = JSON.parse(localStorage.getItem("documents_data")) || [];
let filterData = documentsData;

let overlay;
let sorted = false;
let currentPage = 1;
const itemsPerPage = 6;

// events
toggleSubmitButton();
showData();
updatePaginationInfo();

btnAddNewCustomer.addEventListener("click", handleShowForm);
closeForm.addEventListener("click", handleCloseForm);
submitForm.addEventListener("click", handleAddNewDoc);
filter_by_date.addEventListener("change", handleFilterByDate);

invoice_number.addEventListener("keyup", toggleSubmitButton);
system_invoice_number.addEventListener("keyup", toggleSubmitButton);
invoice_date.addEventListener("change", toggleSubmitButton);
delivery_date.addEventListener("change", toggleSubmitButton);
max_delivery_date.addEventListener("change", toggleSubmitButton);
total_pay.addEventListener("keyup", toggleSubmitButton);
invoice_total.addEventListener("keyup", toggleSubmitButton);
tax_total.addEventListener("keyup", toggleSubmitButton);
invoice_net.addEventListener("keyup", toggleSubmitButton);
total_plus_tax.addEventListener("keyup", toggleSubmitButton);
payed_cash.addEventListener("keyup", toggleSubmitButton);
payed_visa.addEventListener("keyup", toggleSubmitButton);
payed_bank.addEventListener("keyup", toggleSubmitButton);
invoice_type.addEventListener("change", toggleSubmitButton);
left_amount.addEventListener("keyup", toggleSubmitButton);
discount.addEventListener("keyup", toggleSubmitButton);
vat_category_code.addEventListener("change", toggleSubmitButton);
vat_category_sub_type.addEventListener("change", toggleSubmitButton);
return_reason.addEventListener("change", toggleSubmitButton);

// Functions

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
    formTitle.textContent = "إضافة وثيقة جديدة";
    submitForm.textContent = "إضافة";
  } else {
    formTitle.textContent = "Add New Document";
    submitForm.textContent = "Add";
  }

  overlay.addEventListener("click", handleCloseForm);
}

function handleCloseForm() {
  parentForm.classList.remove("top-5");
  parentForm.classList.add("top-[-8000px]");
  document.body.removeChild(overlay);
  submitForm.disabled = true;
  clearForm();
}

function handleAddNewDoc(e) {
  e.preventDefault();

  const newDocument = {
    id: generateFunId(),
    invoice_number: invoice_number.value,
    system_invoice_number: system_invoice_number.value,
    invoice_date: invoice_date.value,
    delivery_date: delivery_date.value,
    max_delivery_date: max_delivery_date.value,
    total_pay: total_pay.value,
    invoice_total: invoice_total.value,
    tax_total: tax_total.value,
    invoice_net: invoice_net.value,
    total_plus_tax: total_plus_tax.value,
    payed_cash: payed_cash.value,
    payed_visa: payed_visa.value,
    payed_bank: payed_bank.value,
    invoice_type: invoice_type.value,
    left_amount: left_amount.value,
    vat_category_code: vat_category_code.value,
    vat_category_sub_type: vat_category_sub_type.value,
    return_reason: return_reason.value,
    discount: discount.value,
  };

  documentsData.push(newDocument);
  localStorage.setItem("documents_data", JSON.stringify(documentsData));

  toaster("تم اضافة الوثيقة بنجاح", "success");
  handleCloseForm();
  showData();
}

function showData() {
  const currentItems = paginateData();

  const tbody = document.getElementById("documents_table_body");
  tbody.innerHTML = `
  ${currentItems
    ?.map((e, index) => {
      return `
    <tr>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        index + 1
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        e.invoice_number
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        e.system_invoice_number
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        e.invoice_date
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        e.invoice_type
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        e.total_pay
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        e.discount
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        e.invoice_net
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        e.tax_total
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200">${
        e.total_plus_tax
      }</td>
      <td class="py-2 px-4 border-b border-r text-center border-gray-200"></td>
      <td class="py-2 px-4 border-r text-center border-gray-200 flex items-center justify-center gap-3 border-b">
          <button
            onclick="handleDelete(${e})"
            class="text-red-600"
            id="delete"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
          <button
          onclick="handleSaveDocId('${e.id}')"
            class="text-blue-600"
            id="update"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      `;
    })
    .join("")}
  `;
}

function toggleSubmitButton() {
  if (
    invoice_number.value === "" ||
    system_invoice_number.value === "" ||
    invoice_date.value === "" ||
    delivery_date.value === "" ||
    max_delivery_date.value === "" ||
    total_pay.value === "" ||
    invoice_total.value === "" ||
    tax_total.value === "" ||
    invoice_net.value === "" ||
    total_plus_tax.value === "" ||
    payed_cash.value === "" ||
    payed_visa.value === "" ||
    payed_bank.value === "" ||
    invoice_type.value === "" ||
    left_amount.value === "" ||
    vat_category_code.value === "" ||
    vat_category_sub_type.value === "" ||
    return_reason.value === "" ||
    discount.value === ""
  ) {
    submitForm.disabled = true;
  } else {
    submitForm.disabled = false;
  }
}

function clearForm() {
  invoice_number.value = "";
  system_invoice_number.value = "";
  invoice_date.value = "";
  delivery_date.value = "";
  max_delivery_date.value = "";
  total_pay.value = "";
  invoice_total.value = "";
  tax_total.value = "";
  invoice_net.value = "";
  total_plus_tax.value = "";
  payed_cash.value = "";
  payed_visa.value = "";
  payed_bank.value = "";
  invoice_type.value = "";
  left_amount.value = "";
  vat_category_code.value = "";
  vat_category_sub_type.value = "";
  return_reason.value = "";
}

function checkLang() {
  const lng = localStorage.getItem("zatca_translation" || "ar");

  return lng === "ar" ? true : false;
}

function handleDelete(index) {
  documentsData.splice(index, 1);
  localStorage.setItem("documents_data", JSON.stringify(documentsData));
  toaster("تم حذف الوثيقة بنجاح", "success");
  showData();
}

function handleFilterByDate(event) {
  const find = documentsData.find((e) => e.invoice_date === event.target.value);

  if (find) {
    filterData = documentsData.filter(
      (e) => e.invoice_date === event.target.value
    );
  } else {
    toaster("لا توجد بيانات لهذا التاريخ", "error");
    return;
  }

  showData();
}

function handleSorted() {
  sorted = !sorted;

  if (documentsData.length === 0) {
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

  documentsData.reverse();
  showData();
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

function handleSaveDocId(doc) {
  localStorage.setItem("save_doc_id", doc);
  location.href = "update-document.html";
}

function generateFunId() {
  const adjectives = [
    "Speedy",
    "Mighty",
    "Golden",
    "Clever",
    "Brave",
    "Silent",
    "Wild",
  ];
  const nouns = [
    "Lion",
    "Falcon",
    "Phoenix",
    "Dragon",
    "Wizard",
    "Ninja",
    "Pirate",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  const timestamp = new Date().getTime();

  return `${randomAdjective}-${randomNoun}-${timestamp}`;
}

// Pagination

function updatePagination() {
  const totalPages = Math.ceil(documentsData.length / itemsPerPage);
  total_page.textContent = totalPages;
}

function paginateData() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filterData.slice(startIndex, endIndex);
}

function updatePaginationInfo() {
  current_page.textContent = currentPage;
  updatePagination();
}

function increment() {
  const totalPages = Math.ceil(documentsData.length / itemsPerPage);
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
