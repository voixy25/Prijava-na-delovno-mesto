function fadeOut(element) {
  var op = 1; 
  var timer = setInterval(function () {
    if (op <= 0.24) {

      clearInterval(timer);
      element.style.display = "none"; 
    }
    element.style.opacity = op; 
    op -= op * 0.01; 
  }, 10); 
}

window.onload = function () {
  setTimeout(function () {
    const loader = document.getElementById("loading");
    fadeOut(loader); 
  }, 2000); 
};

function toggleMenu() {
  document.querySelector(".menu").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const fieldsToCheckBeforeExperience = [
    { id: "name", errorMessage: "Vnesite vaše ime in priimek." },
    { id: "email", errorMessage: "Vnesite veljaven e-mail naslov." },
    {
      id: "sex",
      errorMessage: "Izberite vaš spol.",
      isRadio: true,
    },
    { id: "phone", errorMessage: "Vnesite veljavno telefonsko številko." },
    { id: "address", errorMessage: "Vnesite ulico in hišno številko." },
    { id: "postal-code", errorMessage: "Vnesite veljavno poštno številko." },
    { id: "city", errorMessage: "Vnesite kraj." },
    { id: "dob", errorMessage: "Vnesite veljaven datum rojstva." },
    { id: "education-level", errorMessage: "Izberite stopnjo izobrazbe." },
    { id: "study-field", errorMessage: "Vnsite vašo smer izobrazbe." },
    {
      id: "computer-skills",
      errorMessage: "Vnesite vaša računalniška znanja.",
    },
    { id: "other-skills", errorMessage: "Vnesite vaša druga znanja." },
  ];

  const fieldsToCheckAfterExperience = [
    {
      id: "drivers-license",
      errorMessage: "Izberite stanje vašega vozniškega dovoljenja.",
      isRadio: true,
    },
    {
      id: "english",
      errorMessage: "Izberite ustrezno stopnjo znanja angleškega jezika.",
    },
    {
      id: "italian",
      errorMessage: "Izberite ustrezno stopnjo znanja italijanskega jezika.",
    },
    { id: "start-date", errorMessage: "Vnesite veljaven datum začetka dela." },
    { id: "status", errorMessage: "Izberite ustrezen zaposlitveni status." },
    {
      id: "file-upload",
      errorMessage: "Neveljaven ali manjkajoč življenjepis.",
    },
    {
      id: "privacy",
      errorMessage:
        "S politiko zasebnosti se morate strinjati za nadaljevanje.",
      isCheckbox: true,
    },
  ];

  const nameInput = document.getElementById("name");
  const nameErrorSpan = document.getElementById("name-error");

  nameInput.addEventListener("input", function (e) {

    let value = e.target.value;

    value = value.replace(/[^a-zA-zšđžčćŠĐŽČĆ\s]/g, "");

    e.target.value = value;

    const nameParts = value.split(" ").filter((part) => part.length > 0); 

    const isValid = nameParts.length >= 2; 

    if (isValid) {
      nameErrorSpan.style.display = "none"; 
      e.target.setCustomValidity(""); 
    } else {
      e.target.setCustomValidity("Vnesite ime in priimek."); 
    }
  });

  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); 

    if (value.length > 0 && value[0] !== "0") {
      value = "0" + value.slice(1);
    }

    if (value.length > 3 && value.length <= 6) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 9)}`;
    }

    e.target.value = value; 

    const errorSpan = document.getElementById("phone-error");
    if (value.length === 11) {

      errorSpan.style.display = "none"; 
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity("Vnesite veljavno telefonsko številko");
    }
  });

  const addressInput = document.getElementById("address");
  addressInput.addEventListener("input", function (e) {
    let value = e.target.value;

    value = value.replace(/[^a-zA-Z0-9šđžčćŠĐŽČĆ\s]/g, "");

    const addressPattern = /^([A-Za-zšđžčćŠĐŽČĆ]{2,}\s)+\d+[a-zA-Z]?$/;

    let words = value.match(/^([A-Za-zšđžčćŠĐŽČĆ]+\s?)+/); 
    let digits = value.match(/\d+[a-zA-Z]?$/); 
    if (words && digits) {
      value = words[0].trim() + " " + digits[0]; 
    }

    e.target.value = value;

    const errorSpan = document.getElementById("address-error");
    if (addressPattern.test(value)) {
      errorSpan.style.display = "none"; 
      e.target.setCustomValidity(""); 
    } else {
      e.target.setCustomValidity("Vnesite ulico in hišno številko."); 
    }
  });

  const cityInput = document.getElementById("city");
  const cityErrorSpan = document.getElementById("city-error");

  cityInput.addEventListener("input", function (e) {

    let value = e.target.value;

    value = value.replace(/[^a-zA-ZšđžčćŠĐŽČĆ\s]/g, "");

    e.target.value = value;

    const letterCount = (value.match(/[a-zA-ZšđžčćŠĐŽČĆ]/g) || []).length; 

    if (letterCount >= 2) {
      cityErrorSpan.style.display = "none"; 
      e.target.setCustomValidity(""); 
    } else {
      e.target.setCustomValidity("Vnesite veljaven kraj."); 
    }
  });

  const postalCodeInput = document.getElementById("postal-code");

  postalCodeInput.addEventListener("input", function (e) {

    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 0 && value[0] === "0") {
      value = value.slice(1); 
    }

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    e.target.value = value;

    const errorSpan = document.getElementById("postal-code-error");
    if (value.length === 4) {
      errorSpan.style.display = "none"; 
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity("Vnesite veljavno poštno številko.");
    }
  });

  function validateField(input, errorSpan) {
    const value = input.value.trim();

    const isOnlySlash = value === "/";
    const letterCount = (value.match(/[a-zA-ZšđžčćŠĐŽČĆ]/g) || []).length;

    if (isOnlySlash || letterCount >= 3) {
      errorSpan.style.display = "none"; 
      input.setCustomValidity(""); 
    } else {
      input.setCustomValidity("Polje je obvezno."); 
    }
  }

  const studyFieldInput = document.getElementById("study-field");
  const studyFieldErrorSpan = document.getElementById("study-field-error");

  studyFieldInput.addEventListener("input", function () {
    validateField(studyFieldInput, studyFieldErrorSpan);
  });

  const computerSkillsInput = document.getElementById("computer-skills");
  const computerSkillsErrorSpan = document.getElementById(
    "computer-skills-error"
  );

  computerSkillsInput.addEventListener("input", function () {
    validateField(computerSkillsInput, computerSkillsErrorSpan);
  });

  const otherSkillsInput = document.getElementById("other-skills");
  const otherSkillsErrorSpan = document.getElementById("other-skills-error");

  otherSkillsInput.addEventListener("input", function () {
    validateField(otherSkillsInput, otherSkillsErrorSpan);
  });

  const fileUploadInput = document.getElementById("file-upload");
  const fileUploadErrorSpan = document.getElementById("file-upload-error");

  fileUploadInput.addEventListener("change", function (e) {
    const file = e.target.files[0]; 

    fileUploadErrorSpan.style.display = "none";
    fileUploadInput.setCustomValidity("");

    if (file) {

      const fileExtension = file.name.split(".").pop().toLowerCase(); 

      const allowedExtensions = ["doc", "docx", "pdf"];
      if (!allowedExtensions.includes(fileExtension)) {
        fileUploadErrorSpan.style.display = "block"; 
        fileUploadInput.setCustomValidity(
          "Naložite življenjepis v formatu .doc, .docx ali .pdf."
        ); 
      }
    }
  });

  function handleNoExperienceSelection() {
    const noExperienceCheckbox = document.getElementById("no-experience");
    const checkboxes = document.querySelectorAll('input[name="experience"]');

    if (noExperienceCheckbox.checked) {
      checkboxes.forEach((checkbox) => {
        if (checkbox !== noExperienceCheckbox) {
          checkbox.checked = false;
        }
      });
    }
    updateErrorMessage();
  }

  function handleExperienceSelection() {
    const noExperienceCheckbox = document.getElementById("no-experience");
    const checkboxes = document.querySelectorAll('input[name="experience"]');

    if (
      Array.from(checkboxes).some(
        (checkbox) => checkbox.checked && checkbox !== noExperienceCheckbox
      )
    ) {
      noExperienceCheckbox.checked = false;
    }
    updateErrorMessage();
  }

  function updateErrorMessage() {

    const experienceCheckboxes = document.querySelectorAll(
      'input[name="experience"]'
    );
    const hasExperienceChecked = Array.from(experienceCheckboxes).some(
      (checkbox) => checkbox.checked
    );
    const errorSpan = document.getElementById("experience-error");

    if (!hasExperienceChecked) {
      errorSpan.innerText = "Izbrati morate vsaj eno polje.";
      errorSpan.style.display = "inline";
    } else {
      errorSpan.style.display = "none";
    }
  }

  const experienceCheckboxes = document.querySelectorAll(
    'input[name="experience"]'
  );
  experienceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (checkbox.id === "no-experience") {
        handleNoExperienceSelection();
      } else {
        handleExperienceSelection();
      }
    });
  });

  function validateLanguageProficiency() {
    const englishSelect = document.getElementById("english");
    const italianSelect = document.getElementById("italian");
    const englishValue = englishSelect.value;
    const italianValue = italianSelect.value;

    if (englishValue === "main" && italianValue === "main") {
      return true; 
    }
    return false; 
  }

  function validateFields() {
    let hasError = false;
    let firstErrorFieldId = "";

    [...fieldsToCheckBeforeExperience, ...fieldsToCheckAfterExperience].forEach(
      (field) => {
        const errorSpan = document.getElementById(`${field.id}-error`);
        errorSpan.style.display = "none"; 
      }
    );



    // Step 1: Check only 'name' and 'email' fields
for (const field of fieldsToCheckBeforeExperience) {
  if (field.id === "name" || field.id === "email") {
    const input = document.getElementById(field.id);
    
    if (input.value.trim() === "") {
      hasError = true;
      firstErrorFieldId = field.id;
      break; // Stop further checks if an error is found in 'name' or 'email'
    }
  }
}

// Step 2: Check remaining fields after 'sex'
if (!hasError) { // Only proceed if there were no errors with 'name' or 'email'
  for (const field of fieldsToCheckBeforeExperience) {
    // Skip 'name' and 'email' since they were checked already
    if (field.id === "name" || field.id === "email") continue;

    const input = document.getElementById(field.id);

    // For radio inputs
    if (field.isRadio) {
      const radios = document.getElementsByName(field.id);
      const isChecked = Array.from(radios).some((radio) => radio.checked);
      if (!isChecked) {
        hasError = true;
        firstErrorFieldId = field.id;
        break; // Stop further checks if an error is found
      }
    } 
    // For regular inputs
    else if (input.value.trim() === "") {
      hasError = true;
      firstErrorFieldId = field.id;
      break; // Stop further checks if an error is found
    }
  }
}
    

    const hasExperienceChecked = Array.from(experienceCheckboxes).some(
      (checkbox) => checkbox.checked
    );
    if (!hasExperienceChecked && !hasError) {
      hasError = true;
      firstErrorFieldId = "experience-error"; 
    }

    // Proceed only if no errors so far
if (!hasError) {
  // Step 1: Validate driver's license field
  const driversLicenseField = fieldsToCheckAfterExperience.find(field => field.id === "drivers-license");
  if (driversLicenseField) {
    const radios = document.getElementsByName(driversLicenseField.id);
    const isChecked = Array.from(radios).some((radio) => radio.checked);
    if (!isChecked) {
      hasError = true;
      firstErrorFieldId = driversLicenseField.id;
    }
  }

  // Step 2: Validate language fields if no error in driver's license
  if (!hasError) {
    const languageFields = ["english", "italian"];
    for (const fieldId of languageFields) {
      const input = document.getElementById(fieldId);
      if (input && input.value.trim() === "") {
        hasError = true;
        firstErrorFieldId = fieldId;
        break; // Stop further checks if an error is found in language fields
      }
    }
  }

  if(validateLanguageProficiency()){
    Swal.fire({
      icon: "error",
      title: "Napaka",
      text: "Oba jezika ne moreta biti materna jezika.",
    });
    const errorSpan = document.getElementById("english-error");
      errorSpan.innerText = "Izberite ustrezno stopnjo znanja angleškega jezika.";
      errorSpan.style.display = "inline";
      const errorSpan2 = document.getElementById("italian-error");
      errorSpan2.innerText = "Izberite ustrezno stopnjo znanja italijanskega jezika.";
      errorSpan2.style.display = "inline";
    return true;
  }

  // Step 3: Validate the remaining fields after driver's license and language checks
  if (!hasError) {
    for (const field of fieldsToCheckAfterExperience) {
      // Skip driver's license and language fields as they've already been checked
      if (["drivers-license", "english", "italian"].includes(field.id)) continue;

      const input = document.getElementById(field.id);

      if (field.isRadio) {
        const radios = document.getElementsByName(field.id);
        const isChecked = Array.from(radios).some((radio) => radio.checked);
        if (!isChecked) {
          hasError = true;
          firstErrorFieldId = field.id;
          break;
        }
      } else if (field.isCheckbox) {
        if (!input.checked) {
          hasError = true;
          firstErrorFieldId = field.id;
          break;
        }
      } else if (input && input.value.trim() === "") {
        hasError = true;
        firstErrorFieldId = field.id;
        break;
      }
    }
  }
}

    if (hasError) {
      showErrorMessage(firstErrorFieldId);
      return true; 
    }

    return false; 
  }

  function showErrorMessage(fieldId) {
    const field = [
      ...fieldsToCheckBeforeExperience,
      ...fieldsToCheckAfterExperience,
    ].find((f) => f.id === fieldId);
    if (field) {
      Swal.fire({
        icon: "error",
        title: "Napaka",
        text: field.errorMessage,
        willClose: () => {
          setTimeout(() => {
            scrollToField(fieldId);
          }, 200); 
        },
      });

      const errorSpan = document.getElementById(`${fieldId}-error`);
      errorSpan.innerText = field.errorMessage;
      errorSpan.style.display = "inline";
    } else {
      Swal.fire({
        icon: "error",
        title: "Napaka",
        text: "Izbrati morate vsaj eno polje pri izkušnjah.",
        willClose: () => {
          setTimeout(() => {
            scrollToField("experience-error");
          }, 200);
        },
      });

      const errorSpan = document.getElementById("experience-error");
      errorSpan.innerText = "Izbrati morate vsaj eno polje.";
      errorSpan.style.display = "inline";
    }
  }

  function scrollToField(fieldId) {
    const fieldElement = document.getElementById(fieldId);
    if (fieldElement) {
      const rect = fieldElement.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {

        window.scrollTo({
          top: window.scrollY + rect.top - 100, 
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        fieldElement.focus();
        if (fieldElement.select) {
          fieldElement.select(); 
        }
      }, 400); 
    }
  }

  document
    .getElementById("job-application-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateFields()) {
        Swal.fire({
          icon: "success",
          title: "Prijava poslana!",
          text: "Vaša prijava za delovno mesto je bila uspešno poslana.",
        });
        event.target.reset();
        window.scrollTo(0, 0);
      }
    });
});