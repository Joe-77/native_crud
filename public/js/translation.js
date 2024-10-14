const translation = {
  en: {
    english: "English",
    devices: "Devices",
    customers: "Customers",
    add_device: "Add new device",
    filter: "Filter by",
    status: "Status",
    latest: "Latest to oldest",
    electronic_signature: "Electronic Signature",
    end_date: "End Date",
    promotion: "Promotion",
    actions: "Actions",
    password: "Password",
    add: "Add",
    next: "Next",
    prev: "Prev",
    from: "From",
    documents: "Documents",
    add_new_customer: "Add New Customer",
    sort_by_latest: "Sort by latest",

    customer_arabic_name: "Customer name in Arabic",
    customer_english_name: "Customer name in English",
    tax_customer_number: "Tax number",
    another_customer_id_type: "Another ID type",
    another_customer_invoice_type: "Type of invoices",
    street_arabic: "The street in Arabic",
    street_english: "The street in English",
    city_arabic: "The city in Arabic",
    city_english: "The city in English",
    customer_second_identifier: "The second identifier",
    building_number: "Building number",
    postal_code: "Postal code",
    box_number: "P. O. Box number",
    country: "Country",
    country_arabic: "The country in Arabic",
    country_english: "The country in English",
    add_new_document: "Add New Document",
    invoice_number: "Invoice Number",
    system_invoice_number: "System Invoice Number",
    invoice_date: "Invoice Date",
    invoice_type: "Invoice Type",
    invoice_pay: "Payed",
    discount: "Discount",
    invoice_net: "Invoice Net",
    invoice_tax: "Invoice Tax",
    total_plus_tax: "Subnet Total Plus Tax",
    invoice_status: "Invoice Status",
    delivery_date: "Delivery Date",
    max_delivery_date: "Max Delivery Date",
    total_pay: "Total Payed",
    invoice_total: "Invoice Total",
    tax_total: "Tax Total",
    payed_cash: "Payed (Cash)",
    payed_visa: "Payed (Visa)",
    payed_bank: "Payed (Bank)",
    select_invoice_type: "Select Invoice Type",
    left_amount: "Left Amount",
    vat_category_code: "VAT Category Code:",
    vat_category_sub_type: "VAT Category SubType Code",
    return_reason: "Return Reason",
    update: "Update",
  },
  ar: {
    english: "الانجليزية",
    devices: "الأجهزة",
    customers: "العملاء",
    add_device: "اضافة جهاز جديد",
    filter: "تصفية حسب",
    status: "الحالة",
    latest: "الاحدث الي الاقدم",
    electronic_signature: "التوقيع الإلكتروني",
    end_date: "تاريخ النهاية",
    promotion: "الترويج",
    actions: "الإجراءات",
    password: "كلمة المرور",
    add: "إضافة",
    next: "التالي",
    prev: "السابق",
    from: "من",
    documents: "الوثائق",
    add_new_customer: "إضافة عميل جديد",
    sort_by_latest: "ترتيب من الاحدث الي الأقدم",
    customer_arabic_name: "اسم العميل بالعربية",
    customer_english_name: "اسم العميل بالإنجليزية",
    tax_customer_number: "رقم الضريبة",
    another_customer_id_type: "نوع الهوية",
    another_customer_invoice_type: "نوع الفواتير",
    street_arabic: "الشارع بالعربية",
    street_english: "الشارع بالإنجليزية",
    city_arabic: "المدينة بالعربية",
    city_english: "المدينة بالإنجليزية",
    customer_second_identifier: "المعرف الثاني",
    building_number: "رقم المبنى",
    postal_code: "الرمز البريدي",
    box_number: "رقم صندوق البريد",
    country: "البلد",
    country_arabic: "الدولة باللغه العربية",
    country_english: "الدولة باللغه الإنجليزية",
    add_new_document: "إضافة وثيقة جديدة",
    invoice_number: "رقم الفاتورة",
    system_invoice_number: "رقم فاتورة النظام",
    invoice_date: "تاريخ الفاتورة",
    invoice_type: "نوع الفاتورة",
    invoice_pay: "الدفع",
    discount: "الخصم",
    invoice_net: "صافي الفاتورة",
    invoice_tax: "ضريبة الفاتورة",
    total_plus_tax: "الإجمالي بالإضافة إلى الضريبة",
    invoice_status: "حالة الفاتورة",
    delivery_date: "تاريخ التسليم",
    max_delivery_date: "تاريخ التسليم الأقصى",
    total_pay: "اجمالي الدفع",
    invoice_total: "مجموع الفاتورة",
    tax_total: "مجموع الضريبة",
    payed_cash: "الدفع (كاش)",
    payed_visa: "الدفع (فيزا)",
    payed_bank: "الدفع (بنك)",
    select_invoice_type: "إختر نوع الفاتورة",
    left_amount: "المبلغ المتبقي",
    vat_category_code: "رمز فئة ضريبة القيمة المضافة",
    vat_category_sub_type: "رمز النوع الفرعي لفئة ضريبة القيمة المضافة",
    return_reason: "سبب الإرجاع",
    update : "تحديث",
  },
};

const arabic = document.querySelectorAll(".arabic");
const english = document.querySelectorAll(".english");
const elements = document.querySelectorAll("[data-i18]");

const defaultLang = localStorage.getItem("zatca_translation") || "ar";

let switchLanguage = document.querySelectorAll(".select_lang");

switchLanguage.forEach((element) => {
  element.addEventListener("change", handleChange);
});

function updateUI(lang) {
  elements.forEach((ele) => {
    const key = ele.getAttribute("data-i18");
    ele.textContent = translation[lang][key] || ele.textContent;
  });

  switchLanguage.forEach((element) => {
    element.value = lang;
  });

  if (lang === "en") {
    updateStyles(english, arabic, "ltr");
  } else {
    updateStyles(arabic, english, "rtl");
  }
}

function updateStyles(activeLangElements, inactiveLangElements, direction) {
  activeLangElements.forEach((e) => {
    e.classList.remove("text-gray-800");
    e.classList.add("text-[#C00000]");
    e.style.color = "#C00000";
  });

  inactiveLangElements.forEach((e) => {
    e.classList.remove("text-[#C00000]");
    e.style.color = "gray";
  });

  document.body.dir = direction;
  document.dir = direction;
}

function setLang(value) {
  localStorage.setItem("zatca_translation", value);
  updateUI(value);
}

function handleChange(event) {
  const selectedLang = event.target.value;
  setLang(selectedLang);
}

updateUI(defaultLang);
