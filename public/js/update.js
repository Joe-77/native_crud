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
const submitForm = document.getElementById("submit-form");
const toast = document.getElementById("toast");

const data = JSON.parse(localStorage.getItem("documents_data")) || [];
const doc_id = localStorage.getItem("save_doc_id");
const getDoc = data.filter((doc) => doc.id === doc_id);

// condition

if (data?.length === 0 || doc_id === null) {
  location.href = "index.html";
}

// events

submitForm.addEventListener("click", handleUpdateDoc);

toggleSubmitButton();
setValue();

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

// functions

function handleUpdateDoc(e) {
  e.preventDefault();

  const updatedDocument = {
    id: doc_id,
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

  const documentIndex = data.findIndex((doc) => doc.id === doc_id);

  if (documentIndex !== -1) {
    data[documentIndex] = updatedDocument;
  }

  localStorage.setItem("documents_data", JSON.stringify(data));

  submitForm.disabled = true;
  window.scrollTo(0, 0);
  toaster("تم تحديث الوثيقة بنجاح", "success");
}

function setValue() {
  invoice_number.value = getDoc[0].invoice_number;
  system_invoice_number.value = getDoc[0].system_invoice_number;
  invoice_date.value = getDoc[0].invoice_date;
  delivery_date.value = getDoc[0].delivery_date;
  max_delivery_date.value = getDoc[0].max_delivery_date;
  total_pay.value = getDoc[0].total_pay;
  invoice_total.value = getDoc[0].invoice_total;
  tax_total.value = getDoc[0].tax_total;
  invoice_net.value = getDoc[0].invoice_net;
  total_plus_tax.value = getDoc[0].total_plus_tax;
  payed_cash.value = getDoc[0].payed_cash;
  payed_visa.value = getDoc[0].payed_visa;
  payed_bank.value = getDoc[0].payed_bank;
  invoice_type.value = getDoc[0].invoice_type;
  left_amount.value = getDoc[0].left_amount;
  discount.value = getDoc[0].discount;
  vat_category_code.value = getDoc[0].vat_category_code;
  vat_category_sub_type.value = getDoc[0].vat_category_sub_type;
  return_reason.value = getDoc[0].return_reason;
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
