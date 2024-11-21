// alla sidor som key-value par
const pages = {
  home: "./index.html",
  book: "./allaLeverantörer.html",
  cancelBooking: "./tid-avbokad.html",
  registerUser: "./ny-användare.html",
  registerUserFinished: "./registrering-avslutad.html",
  registerCompany: "./företag-registrering.html",
  aboutUs: "./om-oss.html",
  myPages: "./manageProfile",
  CancelAppointment: "./avboka",
  ConnectCompany: "./företag-registrering",
  CompanyView: "./företagsvy",
  manageProfile: "./manageProfile.html",
  bookingService: "./valAvTjänst.html",
  bookingCalendar: "./bokningssidaKalender.html",
  bookingInfo: "./bokningsuppgifter.html",
  bookingPayment: "./betalningsuppgifter.html",
  bookingFinished: "./betalningsKvitto.html",
  companyView: "./företagsvy.html",
};

// behöver läsas in på global-nivå för att tilldelas en eventlyssnare senare
const body = document.querySelector("body");

// kod för karusell
function loadCarousel() {
  const carousel = document.querySelector(".carousel-cards-lk");
  let isDragging = false;
  let startPos;
  let scrollStart;

  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    carousel.classList.add("active");
    startPos = e.pageX - carousel.offsetLeft;
    scrollStart = carousel.scrollLeft;
    carousel.style.cursor = "grabbing"; // Ändra muspekarens stil när man drar
  });

  carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.classList.remove("active");
    carousel.style.cursor = "grab"; // återställ muspekarens stil
  });

  carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.classList.remove("active");
    carousel.style.cursor = "grab"; // återställ muspekarens stil
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return; // lämnar funktionen om man inte drar i karusellen
    e.preventDefault();
    const currentPosition = e.pageX - carousel.offsetLeft;
    const scrollDistance = (currentPosition - startPos) * 2;
    carousel.scrollLeft = scrollStart - scrollDistance;
  });
}

// ändrar innehåller inom popup-form-container till logga in
function setLoginContent() {
  const formContainer = document.querySelector(".popup-form-container");
  const loginTab = document.querySelector(".login-tab");
  const registerTab = document.querySelector(".register-tab");

  const loginHTML = `

  <form action="" class="popup-form">
    <div class="popup-inputs">
      <div class="label-and-input">
        <label for="email-login">E-postadress</label>
        <input
          class="input"
          id="email-login"
          type="email"
          name="email"
          placeholder="E-postadress"
          required
        />
      </div>
      <div class="label-and-input">
        <label for="password">Lösenord</label>
        <input
          class="input"
          id="password"
          type="password"
          name="password"
          placeholder="********"
          required
        />
        <a class="forgot-password" href="#">Glömt lösenordet?</a>
      </div>
    </div>
    <button class="submit-login btn btn-white">LOGGA IN</button>
  </form>
  `;

  formContainer.innerHTML = loginHTML;
  loginTab.classList.add("active-tab");
  registerTab.classList.remove("active-tab");
}

// ändrar innehåller inom popup-form-container till registrera ny användare
function setRegisterContent() {
  const formContainer = document.querySelector(".popup-form-container");
  const loginTab = document.querySelector(".login-tab");
  const registerTab = document.querySelector(".register-tab");

  const registerHTML = `
  <form action="" class="popup-form">
    <div class="popup-inputs">
      <div class="label-and-input">
        <label for="email-register">E-postadress</label>
        <input
          class="input"
          id="email-register"
          type="email"
          name="email"
          placeholder="E-postadress"
          required
        />
      </div>
      <div class="label-and-input" id="register-label">
        <label for="terms-and-conditions"
          >Jag har läst och samtycker till de
          <span class="terms-and-conditions">villkor och policy</span>
          som gäller för tjänsten.</label
        >
        <input
          class="checkbox"
          id="terms-and-conditions"
          type="checkbox"
          name="terms-and-conditions"
          required
        />
      </div>
    </div>
    <button class="register-new-user btn btn-white" type="button">
      SKAPA KONTO
    </button>
  </form>
  `;

  formContainer.innerHTML = registerHTML;
  registerTab.classList.add("active-tab");
  loginTab.classList.remove("active-tab");
}

// lägger till dialogelement för att logga in på alla sidor med en header
function loadLoginPopup() {
  const header = document.querySelector("header");
  if (!header)
    return console.error("no header on site, unable to load login popup.");

  // innehållet för login-popupen
  const popupHTML = `
  <dialog class="popup dynamic-popup">
    <menu class="popup-tabs">
      <li class="login-tab active-tab">
        <button class="login-button" type="button">Logga in</button>
      </li>
      <li class="register-tab">
        <button class="register-button" type="button">Registrera dig</button>
      </li>
    </menu>
    <div class="popup-body">
      <button class="close-popup" type="button">
        <img src="img/icon_close.svg" alt="" />
      </button>
      <div class="popup-form-container">
        <!-- Innehåll ändras dynamiskt här -->
      </div>
      <div class="popup-separator">
        <div class="separator-line"></div>
        <span class="separator-text">eller</span>
        <div class="separator-line"></div>
      </div>
      <div class="popup-alt-logins">
        <button class="login-bankid btn" id="bankID-btn">
          <img src="img/icon_bankid.svg" alt="" />
          Fortsätt med BankID
        </button>
        <button class="login-facebook btn" id="fb-btn">
          <img src="img/icon_facebook.svg" alt="" />
          Fortsätt med Facebook
        </button>
        <button class="login-google btn" id="g-btn">
          <img src="img/icon-google.svg" alt="" />
          Fortsätt med Google
        </button>
      </div>
    </div>
  </dialog>
  `;

  // lägg till elementet till bodyn
  const div = document.createElement("div");
  div.innerHTML = popupHTML; // parsar strängen till HTML-element
  const dialogElement = div.children[0]; // garanterat hämtar ett nod-element och inte en text-nod
  const main = document.querySelector("main");
  main.appendChild(dialogElement); // lägger till dialog-elementet till main
}

function userRegistration() {
  const userMail = document.querySelector("#email-register").value;
  const checkbox = document.querySelector("#terms-and-conditions").checked;

  if (!userMail || !checkbox)
    return alert("Har du skrivit både e-post och godkänt villkoren?");
  if (!checkEmail(userMail)) return alert("Skriv in en godkänd e-postadress");
  window.location.href = pages.registerUser;
}

// döljer/visar fält för personlig info vid registrering
function toggleUserInfo() {
  const toggleUserInfo = document.querySelector("#user-info-self");
  const userFields = document.querySelectorAll(".user-info");
  toggleUserInfo.dataset.hidden = "true";

  const toggleVisibility = () => {
    if (toggleUserInfo.dataset.hidden === "true") {
      userFields.forEach((field) => {
        field.style.display = "flex";
        toggleUserInfo.innerText =
          "Hämta mina uppgifter genom mitt personnummer";
      });
      toggleUserInfo.dataset.hidden = "false";
    } else {
      userFields.forEach((field) => {
        field.style.display = "none";
        toggleUserInfo.innerText = "Jag vill fylla i mina uppgifter själv";
      });
      toggleUserInfo.dataset.hidden = "true";
    }
  };

  toggleUserInfo.addEventListener("click", toggleVisibility);
  toggleUserInfo.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleVisibility();
    }
  });
}

// kontrollerar ut fälten för personlig info
function checkSocialSecurity() {
  const acceptedInput = "9508243862";
  const socialSecuritySection = document.querySelector(
    "#social-security-section"
  );
  const socialSecurityNo = document.querySelector("#personnummer").value;
  const toggleUserInfo = document.querySelector("#user-info-self");

  if (acceptedInput === socialSecurityNo) {
    // om det finns ett error-element, ta bort det
    const errorElement = document.querySelector(".error-message");

    if (errorElement) {
      errorElement.remove();
      socialSecuritySection.dataset.error = "false";
    }

    if (toggleUserInfo.dataset.hidden === "true") toggleUserInfo.click();

    fillUserFields();
  } else if (
    acceptedInput !== socialSecurityNo &&
    !checkForError(socialSecuritySection)
  ) {
    const errorElement = document.createElement("p");
    const errorMsg = document.createTextNode(
      "Inga uppgifter kopplade till personnummret"
    );
    errorElement.classList.add("error-message");
    errorElement.appendChild(errorMsg);
    socialSecuritySection.insertBefore(errorElement, toggleUserInfo);
    socialSecuritySection.dataset.error = "true";
  }
}

// Fyller ut fälten för personlig info vid registrering
function fillUserFields() {
  const userInfo = {
    firstName: "Anna",
    lastName: "Andersson",
    firstAddress: "Gröngatan 75",
    zipCode: "534 12",
    area: "Grönköping",
  };

  const firstName = document.querySelector("#first-name");
  const lastName = document.querySelector("#last-name");
  const firstAddress = document.querySelector("#first-address");
  const zipCode = document.querySelector("#zip-code");
  const area = document.querySelector("#area");

  firstName.value = userInfo.firstName;
  lastName.value = userInfo.lastName;
  firstAddress.value = userInfo.firstAddress;
  zipCode.value = userInfo.zipCode;
  area.value = userInfo.area;
}

// Hjälpmetod som tittar efter tidigare errormeddelanden
function checkForError(element) {
  if (element.dataset.error === "true") return true;
  else element.dataset.error = "false";
  return false;
}

// Klicka på loggan/verkstadsportalen och återvänd till landing
const navbarLogo = document.querySelector(".navbar-logo");
navbarLogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});

// Kod för hamburgermenyn
const hbmeny = document.querySelector("#hb-meny");
const menulinks = document.querySelector(".hb-links");

hbmeny.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  hbmeny.classList.toggle("close");
  menulinks.classList.toggle("show");
});

document.addEventListener("click", function (e) {
  if (!menulinks.contains(e.target) && e.target !== hbmeny) {
    menulinks.classList.remove("show");
    hbmeny.classList.remove("close");
  }
});

// Kod för login-popup
function addCloseOutsidePopups() {
  const popups = document.querySelectorAll("dialog");

  popups.forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      // skapar en rektangel med samma storlek som popupen
      const rect = dialog.getBoundingClientRect();
      // lyssnar efter att användaren klickar utanför rektangeln
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close(); // stänger popupen om man klickar utanför
      }
    });
  });
}

// Funktion som hanterar alla knapp-tryck
function handleButtonClick(e, button, dynamicPopup) {
  e.preventDefault();

  switch (button.classList[0] || button.id) {
    case "open-login":
      setLoginContent(); // sätt till login per default
      dynamicPopup.showModal();
      break;
    case "login-button":
      setLoginContent(); // byt till login-flik
      break;
    case "register-button":
      setRegisterContent(); // byt till registrera-flik
      break;
    case "close-popup":
      dynamicPopup.close(); // stäng login-popupen
      break;
    case "get-user-info":
      checkSocialSecurity();
      break;
    case "register-new-user":
      userRegistration();
      break;
    case "submit-new-user":
      saveUserInfo();
      break;
    case "connect-btn":
      window.location.href = pages.registerCompany;
      break;
    case "to-contact-us":
      window.location.href = pages.aboutUs;
      break;
    case "sumbit-contact-us":
      validateForm();
      break;
    case "sumbit-register-company":
      validateCompanyForm();
      break;
    case "submit-cancel-btn":
      validateCancelForm();
      break;
    case "go-home-btn":
      window.location.href = pages.home;
      break;
    case "to-booking-btn":
      window.location.href = pages.book;
      break;
    case "card-btn":
      window.location.href = pages.bookingService;
      break;
    case "pick-time-btn":
      window.location.href = pages.bookingCalendar;
      break;
    case "cancel-btn":
      window.location.href = pages.cancelBooking;
      break;
    case "account-settings-form-button-tn":
      changeUserInfo();
      break;
    case "abort-btn":
      window.location.href = pages.bookingService;
      break;
    case "continue-btn":
      proceedBooking();
      break;
    case "return-btn":
      window.location.href = pages.bookingCalendar;
      break;
    case "to-payment-btn":
      validateInfoForm();
      break;
    case "payment-info-button":
      validatePayForm();
      break;
    case "about-us-btns":
      window.location.href = pages.companyView;
      break;
    default:
      break;
  }
}

//Validera kontaktformulär på om oss
// OBS sparar ingen data utan skickar personen vidare till message-sent om allt är korrekt ifyllt.
if (window.location.pathname === "/om-oss.html") {
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

function validateForm() {
  let valid = true;

  //radera felmeddelande
  document.getElementById("nameError").textContent = "";
  document.getElementById("telephoneError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("messageError").textContent = "";

  //validera namn
  const name = document.getElementById("name").value.trim();
  if (name === "") {
    document.getElementById("nameError").textContent =
      "Namn får inte lämnas tomt";
    console.log("fel namn");
    valid = false;
  }

  //validera telefon
  const telephone = document.getElementById("telephone").value.trim();
  const phonePattern = /^07[0-9]{2}[- ]?[0-9]{3}[- ]?[0-9]{3}$/;
  if (!phonePattern.test(telephone)) {
    console.log("fel telefon");
    document.getElementById("telephoneError").textContent =
      "Ange ett giltigt telefonnummer (070-123 45 67).";
    valid = false;
  }

  // validera email
  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent =
      "Ange en giltig e-postadress.";
    valid = false;
  }

  // validerar meddelande
  const message = document.getElementById("message").value.trim();
  if (message === "") {
    document.getElementById("messageError").textContent =
      "Meddelandet får inte vara tomt.";
    valid = false;
  }

  //om allt godkänns
  if (valid) {
    window.location.href = "./message-sent.html";
  }
}

//Validera kontaktformulär på företag-registrera
// OBS sparar ingen data utan skickar personen vidare till message-sent om allt är korrekt ifyllt.
if (window.location.pathname === "/f%C3%B6retag-registrering.html") {
  const companyForm = document.getElementById("companyForm");
  companyForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

function validateCompanyForm() {
  let valid = true;

  //radera felmeddelande
  document.getElementById("nameError").textContent = "";
  document.getElementById("telephoneError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("organisationError").textContent = "";

  //validera namn
  const name = document.getElementById("name").value.trim();
  if (name === "") {
    document.getElementById("nameError").textContent =
      "Namn får inte lämnas tomt";
    console.log("fel namn");
    valid = false;
  }

  //validera telefon
  const telephone = document.getElementById("telephone").value.trim();
  const phonePattern = /^07[0-9]{2}[- ]?[0-9]{3}[- ]?[0-9]{3}$/;
  if (!phonePattern.test(telephone)) {
    console.log("fel telefon");
    document.getElementById("telephoneError").textContent =
      "Ange ett giltigt telefonnummer (070 123 45 67).";
    valid = false;
  }

  // validera email
  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent =
      "Ange en giltig e-postadress.";
    valid = false;
  }

  // validerar organisationsnummer
  const organisationNumber = document
    .getElementById("organisationsnummer")
    .value.trim();
  const organisationPattern = /^(?:\d{6}-\d{4}|\d{10})$/;
  if (!organisationPattern.test(organisationNumber)) {
    document.getElementById("organisationError").textContent =
      "Ange giltigt organisationsnummer.";
    valid = false;
  }

  //om allt godkänns
  if (valid) {
    window.location.href = "./f%C3%B6retag-registrering-avslutad.html";
  }
}

//Validera avbokningsformulär på avboka
// OBS sparar ingen data utan skickar personen vidare till message-sent om allt är korrekt ifyllt.
if (window.location.pathname === "/avboka.html") {
  const cancelForm = document.getElementById("cancelForm");
  cancelForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });
}

function validateCancelForm() {
  let valid = true;

  //radera felmeddelande
  document.getElementById("personNummerError").textContent = "";
  document.getElementById("avbokningskodError").textContent = "";

  //validera personnummer
  const personNummer = document.getElementById("person-nummer").value.trim();
  const personNummerPattern = /^(?:\d{8}-\d{4}|\d{12})$/;
  if (!personNummerPattern.test(personNummer)) {
    console.log("fel personnummer");
    document.getElementById("personNummerError").textContent =
      "Ange ett giltigt personnummer (19900101-1234).";
    valid = false;
  }

  //validera avbokningskod
  const cancelCode = document.getElementById("avboknings-kod").value.trim();
  const cancelCodePattern = /^[A-Za-z0-9]{6}$/;
  if (!cancelCodePattern.test(cancelCode)) {
    console.log("fel avbokningskod");
    document.getElementById("avbokningskodError").textContent =
      "Ange en giltig avbokningskod ex. (AB12CD).";
    valid = false;
  }

  if (valid) {
    window.location.href = "/tid-avbokad.html";
  }
}

// Kod som redirectar från hamburgermenyn till rätt sida
const links = document.querySelectorAll(".hb-links li");

links.forEach((link, index) => {
  link.addEventListener("click", () => {
    switch (index) {
      case 0:
        window.location.href = "./manageProfile.html";
        break;
      case 1:
        window.location.href = "./avboka.html";
        break;
      case 2:
        window.location.href = "./företag-registrering.html";
        break;
      case 3:
        window.location.href = "./om-oss.html";
        break;
      case 4:
        window.location.href = "./logout.html"; //hur gör vi här? finns ingen logout.html
        break;
      default:
        console.log("Ingen matchande länk hittades.");
    }
  });
});

// Kod för att öppna företagsnotiser

// initializeModal funktion
function initializeModal() {
  // Kontrollera om pathwayn innehåller ordet "företagsvy"
  if (window.location.pathname.includes("tagsvy")) {
    // Om pathwayn innehåller "företagsvy", kör handleModal-funktionen
    handleModal(
      "#business-menu-modal",
      "#notification-open-button",
      "#notification-close-button"
    );
  } else {
    console.log("Modal initialization skipped: Not on företagsvy page.");
  }
}

// handleModal funktion
function handleModal(modalId, openButtonId, closeButtonId) {
  const modal = document.querySelector(modalId);
  const openModal = document.querySelector(openButtonId);
  const closeModal = document.querySelector(closeButtonId);

  // Kontrollera om modal och knappar finns
  if (!modal || !openModal || !closeModal) {
    console.error("Modal or buttons not found, check the IDs.");
    return;
  }

  openModal.addEventListener("click", () => {
    modal.showModal();
  });

  closeModal.addEventListener("click", () => {
    modal.close();
  });
}

// Script för att skapa schemanätet
const container = document.getElementById("grid-schedule-wrapper");

// Kontrollera om container existerar
if (container) {
  // Array för den första raden i griden med veckodagar
  const headerLabels = [
    "Klocka",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
  ];

  // Genererar slumpmässiga datum i strängar
  const headerDates = [
    "",
    "2 oktober",
    "3 oktober",
    "4 oktober",
    "5 oktober",
    "6 oktober",
  ];

  // Skapar headerraden med veckodagar och datum
  headerLabels.forEach((label, index) => {
    const headerItem = document.createElement("div");
    headerItem.classList.add("schedule-item", "header-item");

    const dayLabel = document.createElement("span");
    dayLabel.textContent = label;

    const dateLabel = document.createElement("span");
    dateLabel.classList.add("header-date");
    dateLabel.textContent = headerDates[index];

    headerItem.appendChild(dayLabel);
    headerItem.appendChild(dateLabel);
    container.appendChild(headerItem);
  });

  let hour = 8;
  let minute = 0;

  // Funktion för att skapa tidsformatet enligt timme och minut
  function formatTime(hour, minute) {
    let formattedHour = hour < 10 ? "0" + hour : hour;
    let formattedMinute = minute < 10 ? "0" + minute : minute;
    return `${formattedHour}:${formattedMinute}`;
  }

  // Genererar 17 rader med tider som ökar med 30 minuter
  for (let row = 0; row < 17; row++) {
    const timeItem = document.createElement("div");
    timeItem.classList.add("schedule-item", "time-item");
    timeItem.textContent = formatTime(hour, minute);
    container.appendChild(timeItem);

    const isTwelveOClock = hour === 12 && minute === 0;

    // Skapa de återstående 5 cellerna för raden
    for (let col = 0; col < 5; col++) {
      const emptyItem = document.createElement("div");
      emptyItem.classList.add("schedule-item");
      if (isTwelveOClock) {
        emptyItem.classList.add("twelve-o-clock");
      }
      container.appendChild(emptyItem);
    }

    // Tiden ökar på med 30 minuter
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  // Funktion som generar slumpmässiga tal för att välja ut slumpmässiga celler
  function getRandomIndexes(totalCells, randomCount) {
    const indexes = new Set();
    while (indexes.size < randomCount) {
      indexes.add(Math.floor(Math.random() * totalCells));
    }
    return Array.from(indexes);
  }

  const totalCells = 17 * 5; // Förutom den första raden
  const randomCellIndexes = getRandomIndexes(totalCells, 20); // 20 slumpmässiga celler väljs

  const allGridItems = document.querySelectorAll(
    "#grid-schedule-wrapper .schedule-item:not(.time-item):nth-child(n+7)"
  );

  randomCellIndexes.forEach((index) => {
    allGridItems[index].classList.add("background-random");
  });

  allGridItems.forEach((cell) => {
    if (!cell.classList.contains("background-random")) {
      cell.classList.add("customer-info");

      const customerName = document.createElement("p");
      customerName.classList.add("customer-name");
      customerName.textContent = "[namn kund]";

      const service = document.createElement("p");
      service.classList.add("service");
      service.textContent = "[tjänst]";

      cell.appendChild(customerName);
      cell.appendChild(service);
    }
  });
} else {
  console.log("No schedule grid found on this page.");
}

// sparar ens input-värden som properties i ett användarobjekt och sparar det till sessionstorage
function saveUserInfo() {
  let valid = true;
  const requiredInputs = document.querySelectorAll("input[required]");
  const password = document.querySelector("#password").value;

  requiredInputs.forEach((input) => {
    if (!input.value) valid = false;
  });

  if (!valid)
    alert("Du måste fylla i alla obligatoriska fält för att gå vidare");
  else if (!checkPassword(password))
    alert(
      "lösenord ej accepterat.\nLösenordet måste:\n - Vara minst 8 tecken långt.\n - Innehålla minst en stor bokstav.\n - Innehålla minst en siffra.\n - Innehålla ett tecken som varken är en siffra eller en bokstav. "
    );
  else {
    let user = {
      password: document.getElementById("password").value,
      personnummer: document.getElementById("personnummer").value,
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      firstAddress: document.getElementById("first-address").value,
      secondAddress: document.getElementById("second-address").value,
      zipCode: document.getElementById("zip-code").value,
      area: document.getElementById("area").value,
      regNr: document.getElementById("reg-nr").value,
      phoneNumber: document.getElementById("phone-number").value,
      remindersByText: document.getElementById("reminders-by-text").checked,
      remindersByMail: document.getElementById("reminders-by-mail").checked,
      marketingByText: document.getElementById("marketing-by-text").checked,
      marketingByMail: document.getElementById("marketing-by-mail").checked,
    };

    sessionStorage.setItem("userData", JSON.stringify(user));

    window.location.href = pages.registerUserFinished;
  }
}

// avfyran när man klickar på spara under mina sidor, kan expanderas till att man kan uppdatera alla ens personuppgifter
function changeUserInfo() {
  const currentPass = document.querySelector("#current-pass").value;
  const newPass = document.querySelector("#old-pass").value;
  const newPassRep = document.querySelector("#old-pass-rep").value;

  if (newPass) updatePassword(currentPass, newPass, newPassRep);
}

/**
 * kollar att ens lösen godkänner validering
 * - minst 8 tecken,
 * - en stor bokstav,
 * - en siffra,
 * - ett tecken som varken är en siffra eller en bokstav
 */
function checkPassword(password) {
  const pwRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
  return pwRegex.test(password);
}

function checkEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

// uppdaterar ens lösenord på mina sidor
function updatePassword(currentPass, newPass, newPassRep) {
  let userData = sessionStorage.getItem("userData");
  let user = JSON.parse(userData) || {};

  if (!checkPassword(newPass)) {
    alert(
      "Nytt lösenord ej accepterat.\nLösenordet måste:\n - Vara minst 8 tecken långt.\n - Innehålla minst en stor bokstav.\n - Innehålla minst en siffra.\n - Innehålla ett tecken som varken är en siffra eller en bokstav. "
    );
  } else if (newPass !== newPassRep) {
    alert("Lösenorden matchar inte.");
  } else if (newPass === currentPass) {
    alert("Ditt nya lösenord får inte vara samma som ditt nuvarande.");
  } else {
    alert("Lösenordet har uppdaterats.");
    user.password = newPass;
    sessionStorage.setItem("userData", JSON.stringify(user));
    window.location.pathname = pages.manageProfile;
  }
}

// Hämtar ens nuvarande lösen från sessiondata
function loadPassword() {
  let userData = sessionStorage.getItem("userData");
  let user = JSON.parse(userData) || {};

  if (!user.password) {
    user.password = "!p4sSw0rd";
    sessionStorage.setItem("userData", JSON.stringify(user));
  }

  const pwInput = document.querySelector("#current-pass");
  pwInput.value = user.password;
}

/**
 * funktioner kopplade till att boka en tid i kalendern
 */
function generateCalendar() {
  const calendar = document.querySelector(".calendar");
  calendar.innerHTML = "";
  // hämtar in .calendar

  const calendarTimesElement = document.querySelector(".calendar-times");
  calendarTimesElement.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const date = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    // skapar en loop som körs sju gånger.

    const dayOfWeek = date.toLocaleDateString("sv-SE", { weekday: "short" });
    const day = date.toLocaleDateString("sv-SE", { day: "numeric" });
    const month = date.toLocaleDateString("sv-SE", { month: "long" });
    dayElement.innerHTML = `${dayOfWeek.toUpperCase()}<br>${day}<br>${month}`;
    // för varje datum skapas ett nytt html element som fylls med information
    //om dagen

    // om valt datum är dagens datum markeras det.
    if (date.toDateString() === new Date().toDateString()) {
      dayElement.classList.add("current");
    }
    calendar.appendChild(dayElement);

    // genererar tider för varje dag
    generateTimesForDay(calendarTimesElement, date);
  }
}

function generateTimesForDay(calendarTimesElement, date) {
  const timesElement = document.createElement("div");
  timesElement.classList.add("times");
  // skapar ett html element (.times) och lägger det i calendar times.
  // kör en loop mellan 9 och 15.
  // för varje timme i loopen körs en inre loop från 0 till 30 minuter

  for (let hour = 9; hour <= 15; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeElement = document.createElement("div");
      timeElement.classList.add("time", "disable"); // för varje intervall skapas ett html element med klassen .time
      timeElement.dataset.time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeElement.textContent = timeElement.dataset.time;

      // sparar datumet som en sträng i HTMLElemenentets dataset
      timeElement.dataset.date = date.toISOString();

      //lägger till det nya .time elementet till .times
      timesElement.appendChild(timeElement);
    }
  }

  calendarTimesElement.appendChild(timesElement);
}

function selectTime(timeElement, date) {
  // tar bort selected och lägger till det valda...
  const selectedTimeElement = document.querySelector(".time.selected");
  if (selectedTimeElement) {
    selectedTimeElement.classList.remove("selected");
  }
  timeElement.classList.add("selected");
  updateSelectedTime(timeElement.dataset.time, date);
  updatePriceAndTime(); // anropar updatePrice
}

function updateSelectedTime(time, date) {
  const selectedTimeElement = document.querySelector(".selected-time");

  // Konvertera tillbaka strängen till ett datum
  const selectedDate = new Date(date);

  const dayOfWeek = selectedDate.toLocaleDateString("sv-SE", {
    weekday: "short",
  });
  const day = selectedDate.toLocaleDateString("sv-SE", { day: "numeric" });
  const month = selectedDate.toLocaleDateString("sv-SE", { month: "long" });
  selectedTimeElement.textContent = `Din tid: ${time} - ${dayOfWeek} ${day} ${month}`;
}

function updatePriceAndTime() {
  const priceElement = document.querySelector("#price-amount");
  const timeElement = document.querySelector("#time-amount");
  priceElement.textContent = "300 kr";
  timeElement.textContent = "15 min";
}

function handleTimeClick(timeSlot, date) {
  return function () {
    selectTime(timeSlot, date);
  };
}

function isRegNrValid(input) {
  let regex = /[A-Za-z]+[0-9]+/i;
  return regex.test(input);
}

function proceedBooking() {
  const timeSlots = document.querySelectorAll(".time");
  let timeSelected = false;

  timeSlots.forEach((timeSlot) => {
    if (timeSlot.classList.contains("selected")) timeSelected = true;
  });

  if (timeSelected) window.location.href = pages.bookingInfo;
  else
    alert(
      "Du måste först boka en tid för tjänsten innan du kan gå till betalning."
    );
}

////// ALLA LEVERANTÖRER

const sortingButton = document.querySelector(".sorting-button");
const sortingOptions = document.querySelector(".sorting-options");

if (sortingButton) {
  sortingButton.addEventListener("click", () => {
    sortingOptions.style.display =
      sortingOptions.style.display === "none" ? "block" : "none";
  });
}

if (sortingOptions) {
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".sorting-dropdown")) {
      sortingOptions.style.display = "none";
    }
  });
}

const sortingOptionsList = document.querySelectorAll(".sorting-options li");
let currentSortMode = "distance";

sortingOptionsList.forEach((option) => {
  option.addEventListener("click", () => {
    currentSortMode = option.dataset.sort;
    sortingButton.textContent = `${option.textContent} ${String.fromCharCode(
      9660
    )}`;
    sortingOptions.style.display = "none";
    sortCards();
  });
});

// Sorterar efter dom tre olika valen. När sidan laddas är korten osorterade
function sortCards() {
  const searchItems = document.querySelectorAll(".search-item");
  const cards = Array.from(searchItems);

  cards.sort((a, b) => {
    switch (currentSortMode) {
      case "distance":
        return getDistance(a) - getDistance(b);
      case "rating":
        return getRating(b) - getRating(a);
      case "availability":
        return getAvailability(a) - getAvailability(b);
      default:
        return 0;
    }
  });

  cards.forEach((card) => {
    card.parentNode.appendChild(card);
  });
}

function getDistance(card) {
  const distanceText = card.querySelector(".search-distance p").textContent;
  return parseFloat(distanceText.replace(" km från dig", ""));
}

function getRating(card) {
  const ratingText = card.querySelector(".search-name h1").textContent;
  switch (ratingText) {
    case "Mickes":
    case "Tiresome":
    case "Firman":
    case "Däck!":
    case "Hjul!":
      return 5;
    default:
      return 0;
  }
}

function getAvailability(card) {
  const timeText = card.querySelector(".search-time b").textContent;
  const timeValue = parseInt(timeText.replace("kl ", ""));
  return timeValue;
}

sortCards();

///funktion för antal sökresultat 10 20 30

const companies = [
  "DEKKS",
  "Hjul!",
  "Mekks",
  "Däckia",
  "Firman",
  "Tiresome",
  "Mickes",
  "Hjulia",
  "Däck!",
  "Världsdäck",
  "Hjulthema",
];
//Funktion som visar antal företag

const searchItems = document.querySelectorAll(".search-item");

const btn10 = document.getElementById("10");
const btn20 = document.getElementById("20");
const btn30 = document.getElementById("30");

if (btn10 && btn20 && btn30) {
  btn10.addEventListener("click", () => {
    // Dölj alla search-item element förutom de 10 första
    searchItems.forEach((item, index) => {
      if (index >= 10) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  });

  btn20.addEventListener("click", () => {
    searchItems.forEach((item, index) => {
      if (index >= 20) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  });

  btn30.addEventListener("click", () => {
    window.location.reload();
  });
}

///////funktion bilmodell
// Funktion för att kontrollera registreringsnumret
function updateRegistrationText() {
  const registrationText = document.getElementById("registration-text");
  registrationText.textContent = "Volvo v70 turbo (grå metallic)";
}

/// regel som bara apliceras när 10 resultat visas
/// funktion för sökfältet
const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector(".search-button");

const searchCompany = document.querySelectorAll(".search-item");

if (searchButton) {
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    searchCompany.forEach((item) => {
      const companyName = item
        .querySelector(".search-name h3")
        .textContent.toLowerCase();

      if (companyName.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}

/// hämtar in alla search-btn och länkar till valAvTjänst.html
const searchBtns = document.querySelectorAll(".search-btn");

// Lägg till en klickhanterare för varje search-btn-element
searchBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Navigera till sidan "valAvTjänst.html" när knappen klicks
    window.location.href = "valAvTjänst.html";
  });
});

if (window.location.pathname == "/bokningsuppgifter.html") {
  document.getElementById("coupon-btn").addEventListener("click", () => {
    document.getElementById("coupon").value = "";
    window.alert("Ange en giltig kampanjkod");
  });
}

function validateInfoForm() {
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("last-name");
  const phoneNumber = document.getElementById("phone-number");
  const email = document.getElementById("email");

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    phoneNumber.value === "" ||
    email.value === ""
  ) {
    window.alert("Var vänlig fyll i alla fälten");
    return;
  }

  //kollar så för och efternamnet endast innehåller bokstäver
  if (/[^a-zA-Z ]/.test(firstName.value)) {
    window.alert("Fyll i ett giltigt förnamn");
    return;
  }

  if (/[^a-zA-Z ]/.test(lastName.value)) {
    window.alert("Fyll i ett giltigt efternamn");
    return;
  }

  //kollar så telefon nummret endast innehåller siffror
  if (!/[0-9 ]/.test(phoneNumber.value)) {
    window.alert("Fyll i ett giltigt telefonnummer");
    return;
  }

  //kollar så numret inte är för kort
  if (phoneNumber.value.length < 10) {
    window.alert("Fyll i ett giltigt telefonnummer");
    return;
  }

  //kollar så emailen är korrekt
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    window.alert("Fyll i en giltig epost");
    return;
  }

  window.location.href = pages.bookingPayment;
}

if (window.location.pathname == "/betalningsuppgifter.html") {
  const payButton = document.getElementById("payment-info-button");
  payButton.addEventListener("click", () => {
    validatePayForm();
  });
}

function validatePayForm() {
  const nameField = document.getElementById("card-name");
  const cardNumberField = document.getElementById("card-number");
  const dateField = document.getElementById("expiration");
  const cvcField = document.getElementById("cvc-info");

  //kolla så inget fält är tomt
  if (
    nameField.value === "" ||
    cardNumberField.value === "" ||
    dateField.value === "" ||
    cvcField.value === ""
  ) {
    window.alert("Fyll i alla fälten");
    return;
  }

  //kollar om namnet bara innehåller bokstäver
  if (/[^a-zA-Z ]/.test(nameField.value)) {
    window.alert("Fyll i ett giltigt namn");
    return;
  }

  //kollar så kort numret bara innehåller siffror
  if (!/[0-9 ]/.test(cardNumberField.value)) {
    window.alert("Fyll i ett giltigt kortnummer");
    return;
  }

  //kollar längden på kort numret
  if (cardNumberField.value.length != 16) {
    window.alert("Fyll i ett giltigt kortnummer");
    return;
  }

  //kollar så cvc numret bara innehåller siffror
  if (!/[0-9]/.test(cvcField.value)) {
    window.alert("Fyll i ett giltigt cvc nummer");
    return;
  }

  window.location.href = pages.bookingFinished;
}

/**
 * Kör flera kodstycken när DOM är laddad:
 * * initializeModal
 * * lägger till eventlyssnare för submit & click på formulär med klassen "user-form"
 * * lägger till eventlyssnare för sumbit på inputfältet där man skriver in reg. nr. under bokningen
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Current pathname: ", window.location.pathname);
  initializeModal();

  const userForms = document.querySelectorAll(".user-form");
  if (userForms.length > 0) {
    userForms.forEach((form) => {
      form.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          if (document.activeElement.type !== "submit") {
            e.preventDefault();
          }
        }
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        saveUserInfo();
      });
    });
  }

  const regForm = document.querySelector("#reg-nr-form");
  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const regNr = document.querySelector("#reg-nr").value;
      const redField = document.querySelector(".red-field");
      const timeSlots = document.querySelectorAll(".time");

      if (!isRegNrValid(regNr)) {
        alert(
          "Registreringsnummret är inte giltigt. \nFölj exemplet med tre bokstäver följt av tre siffror."
        );
        redField.style.display = "flex";

        timeSlots.forEach((timeSlot) => {
          timeSlot.classList.add("disable");

          // Tar bort klickhantering så man inte kan klicka på disabled tider
          timeSlot.removeEventListener("click", timeSlot.handleTimeClick);
        });
      } else {
        updateRegistrationText();
        redField.style.display = "none";

        timeSlots.forEach((timeSlot) => {
          timeSlot.classList.remove("disable");

          const date = timeSlot.dataset.date;

          //lägger till klickhantering
          timeSlot.handleTimeClick = handleTimeClick(timeSlot, date);
          timeSlot.addEventListener("click", timeSlot.handleTimeClick);
        });
      }
    });
  }
});

// Bodyn får en eventlyssnare för click-event, hanterar alla knapptryck i bodyn (event-delegation)
body.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button || button.type === "submit") return; // ställer till rätt mycket problem dessvärre
  const dynamicPopup = document.querySelector(".dynamic-popup");
  handleButtonClick(e, button, dynamicPopup);
});

// Körs direkt vid inladdning
function start() {
  loadLoginPopup();
  addCloseOutsidePopups();

  if (location.pathname.includes("index")) {
    loadCarousel();
  } else if (location.pathname.includes("registrering-avslutad")) {
    const toMyPages = document.querySelector(".to-my-pages");
    if (toMyPages) {
      toMyPages.addEventListener("click", () => {
        window.location.pathname = pages.manageProfile;
      });
    }
  } else if (location.pathname.includes("ny")) {
    toggleUserInfo();
  } else if (location.pathname.includes("manageProfile")) {
    loadPassword();
  } else if (location.pathname.includes("bokningssidaKalender")) {
    generateCalendar();
  }
}

start();
