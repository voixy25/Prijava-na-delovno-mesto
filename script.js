window.onload = function () {
    setTimeout(function () {
        const loader = document.getElementById('loading');
        loader.classList.add('fade-out');
        setTimeout(() => loader.style.display = 'none', 1000); // Adjust this to match transition duration
    }, 5000);
};

document.addEventListener('DOMContentLoaded', function () {
    const fieldsToCheckBeforeExperience = [
        { id: 'name', errorMessage: 'Vnesite vaše ime in priimek.' },
        { id: 'email', errorMessage: 'Vnesite veljaven e-mail naslov.' },
        { id: 'phone', errorMessage: 'Vnesite veljavno telefonsko številko.' },
        { id: 'address', errorMessage: 'Vnesite ulico in hišno številko.' },
        { id: 'postal-code', errorMessage: 'Vnesite veljavno poštno številko.' },
        { id: 'city', errorMessage: 'Vnesite kraj.' },
        { id: 'dob', errorMessage: 'Vnesite veljaven datum rojstva.' },
        { id: 'education-level', errorMessage: 'Izberite stopnjo izobrazbe.' },
        { id: 'study-field', errorMessage: 'Vnsite vašo smer izobrazbe.' },
        { id: 'computer-skills', errorMessage: 'Vnesite vaša računalniška znanja.' },
        { id: 'other-skills', errorMessage: 'Vnesite vaša druga znanja.' },
    ];

    const fieldsToCheckAfterExperience = [
        { id: 'drivers-license', errorMessage: 'Izberite stanje vašega vozniškega dovoljenja.', isRadio: true },
        { id: 'english', errorMessage: 'Izberite ustrezno stopnjo znanja angleškega jezika.' },
        { id: 'italian', errorMessage: 'Izberite ustrezno stopnjo znanja italijanskega jezika.' },
        { id: 'start-date', errorMessage: 'Vnesite veljaven datum začetka dela.' },
        { id: 'status', errorMessage: 'Izberite ustrezen zaposlitveni status.' },
        { id: 'file-upload', errorMessage: 'Neveljaven ali manjkajoč življenjepis.' },
        { id: 'privacy', errorMessage: 'S politiko zasebnosti se morate strinjati za nadaljevanje.', isCheckbox: true },
    ];

    const nameInput = document.getElementById('name');
const nameErrorSpan = document.getElementById('name-error');

nameInput.addEventListener('input', function (e) {
    // Get the current value of the input field
    let value = e.target.value;

    // Remove any characters that are not letters or spaces
    value = value.replace(/[^a-zA-Z\s]/g, '');

    // Set the formatted value back to the input
    e.target.value = value;

    // Split the value into parts based on spaces and filter out any empty strings
    const nameParts = value.split(' ').filter(part => part.length > 0); // Keep only non-empty parts

    // Validate the input value
    const isValid = nameParts.length >= 2; // Ensure there are at least two parts (first and last name)

    // Check the validity of the input
    if (isValid) {
        nameErrorSpan.style.display = 'none'; // Hide error if valid
        e.target.setCustomValidity(''); // Clear any previous error
    } else {
        e.target.setCustomValidity('Vnesite ime in priimek.'); // Set custom error message
    }
});

    const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    
    // Ensure the first digit is 0
    if (value.length > 0 && value[0] !== '0') {
        value = '0' + value.slice(1);
    }
    
    // Apply formatting as ###-###-###
    if (value.length > 3 && value.length <= 6) {
        value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6) {
        value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 9)}`;
    }

    e.target.value = value; // Set the formatted value back to the input

    const errorSpan = document.getElementById('phone-error');
    if (value.length === 11) { // 0XX-XXX-XXX has exactly 11 characters
        errorSpan.style.display = 'none'; // Hide error if valid
        e.target.setCustomValidity('');
    } else {
        e.target.setCustomValidity('Vnesite veljavno telefonsko številko');
    }
});

const addressInput = document.getElementById('address');
addressInput.addEventListener('input', function (e) {
    let value = e.target.value;

    // Remove leading/trailing whitespace and any invalid characters
    value = value.replace(/[^a-zA-Z0-9\s]/g, '');

    // Regular expression to match "at least two letters, space, at least one digit"
    const addressPattern = /^[A-Za-z]{2,}\s\d+$/;

    // Auto-format: Insert a space before the first digit
    let letters = value.match(/^[A-Za-z]+/);
    let digits = value.match(/\d+$/);
    if (letters && digits) {
        value = letters[0] + ' ' + digits[0];
    }

    // Check if input matches the pattern
    

    e.target.value = value; // Set the formatted value back to the input

    const errorSpan = document.getElementById('address-error');
    if (addressPattern.test(value)) {
        errorSpan.style.display = 'none'; // Hide error if valid
        e.target.setCustomValidity(''); // Clear any previous error
    } else {
        e.target.setCustomValidity('Vnesite ulico in hišno številko.');
    }
});

const cityInput = document.getElementById('city');
const cityErrorSpan = document.getElementById('city-error');

// Add event listener for input validation
cityInput.addEventListener('input', function (e) {
    // Get the current value of the input field
    let value = e.target.value;

    // Remove any characters that are not letters or spaces
    value = value.replace(/[^a-zA-Z\s]/g, '');

    // Set the formatted value back to the input
    e.target.value = value;

    // Check if the value has at least 2 letters (excluding spaces)
    const letterCount = (value.match(/[a-zA-Z]/g) || []).length; // Count letters

    // Check the validity of the input
    if (letterCount >= 2) {
        cityErrorSpan.style.display = 'none'; // Hide error if valid
        e.target.setCustomValidity(''); // Clear any previous error
    } else {
        e.target.setCustomValidity('Vnesite veljaven kraj.'); // Set custom error message
    }
});

const postalCodeInput = document.getElementById('postal-code');

postalCodeInput.addEventListener('input', function (e) {
    // Remove any non-digit characters
    let value = e.target.value.replace(/\D/g, '');

    // Ensure the first digit is not 0
    if (value.length > 0 && value[0] === '0') {
        value = value.slice(1); // Remove the leading 0 if it exists
    }

    // Limit to a maximum of 4 digits
    if (value.length > 4) {
        value = value.slice(0, 4);
    }

    // Set the formatted value back to the input field
    e.target.value = value;

    // Display error if the postal code is not exactly 4 digits or starts with 0
    const errorSpan = document.getElementById('postal-code-error');
    if (value.length === 4) {
        errorSpan.style.display = 'none'; // Hide error if valid
        e.target.setCustomValidity('');
    } else {
        e.target.setCustomValidity('Vnesite veljavno poštno številko.');
    }
});



function handleNoExperienceSelection() {
    const noExperienceCheckbox = document.getElementById('no-experience');
    const checkboxes = document.querySelectorAll('input[name="experience"]');

    // If "Nimam izkušenj" is checked, uncheck all other boxes
    if (noExperienceCheckbox.checked) {
        checkboxes.forEach(checkbox => {
            if (checkbox !== noExperienceCheckbox) {
                checkbox.checked = false;
            }
        });
    }
    updateErrorMessage();
}

function handleExperienceSelection() {
    const noExperienceCheckbox = document.getElementById('no-experience');
    const checkboxes = document.querySelectorAll('input[name="experience"]');

    // If any other checkbox is checked, uncheck "Nimam izkušenj"
    if (Array.from(checkboxes).some(checkbox => checkbox.checked && checkbox !== noExperienceCheckbox)) {
        noExperienceCheckbox.checked = false;
    }
    updateErrorMessage();
}

function updateErrorMessage() {
    // This function can be used to dynamically show/hide experience-related errors
    const experienceCheckboxes = document.querySelectorAll('input[name="experience"]');
    const hasExperienceChecked = Array.from(experienceCheckboxes).some(checkbox => checkbox.checked);
    const errorSpan = document.getElementById('experience-error');
    
    if (!hasExperienceChecked) {
        errorSpan.innerText = 'Vsaj eno izkušnjo morate izbrati.';
        errorSpan.style.display = 'inline';
    } else {
        errorSpan.style.display = 'none';
    }
}

// Add event listeners for experience checkboxes
const experienceCheckboxes = document.querySelectorAll('input[name="experience"]');
experienceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (checkbox.id === 'no-experience') {
            handleNoExperienceSelection();
        } else {
            handleExperienceSelection();
        }
    });
});

// Input validation and formatting logic (rest of your existing code)...

function validateFields() {
    let hasError = false;
    let firstErrorFieldId = '';

    // Reset error messages
    [...fieldsToCheckBeforeExperience, ...fieldsToCheckAfterExperience].forEach(field => {
        const errorSpan = document.getElementById(`${field.id}-error`);
        errorSpan.style.display = 'none'; // Hide error message
    });

    // Validate fields before experience
    for (const field of fieldsToCheckBeforeExperience) {
        const input = document.getElementById(field.id);
        if (input.value.trim() === '' && !hasError) {
            hasError = true;
            firstErrorFieldId = field.id; // Set to the first empty required field
        }
    }

    // Check if at least one experience checkbox is selected
    const hasExperienceChecked = Array.from(experienceCheckboxes).some(checkbox => checkbox.checked);
    if (!hasExperienceChecked && !hasError) {
        hasError = true;
        firstErrorFieldId = 'experience-error'; // Point to experience error
    }

    // Validate fields after experience only if no errors before experience
    if (!hasError) {
        for (const field of fieldsToCheckAfterExperience) {
            const input = document.getElementById(field.id);
            if (field.isRadio) {
                const radios = document.getElementsByName(field.id);
                const isChecked = Array.from(radios).some(radio => radio.checked);
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
            } else if (input.value.trim() === '') {
                hasError = true;
                firstErrorFieldId = field.id;
                break;
            }
        }
    }

    // Show the first error message if any errors found
    if (hasError) {
        showErrorMessage(firstErrorFieldId);
        return true; // Indicate that errors were found
    }

    return false; // No errors found
}

    function showErrorMessage(fieldId) {
        const field = [...fieldsToCheckBeforeExperience, ...fieldsToCheckAfterExperience].find(f => f.id === fieldId);
        if (field) {
            Swal.fire({
                icon: 'error',
                title: 'Napaka',
                text: field.errorMessage,
                willClose: () => {
                    setTimeout(() => {
                        scrollToField(fieldId);
                    }, 200); // Ensure SweetAlert fully closes before scrolling
                }
            });
    
            const errorSpan = document.getElementById(`${fieldId}-error`);
            errorSpan.innerText = field.errorMessage;
            errorSpan.style.display = 'inline';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Napaka',
                text: 'Vsaj eno izkušnjo morate izbrati.',
                willClose: () => {
                    setTimeout(() => {
                        scrollToField('experience-error');
                    }, 200);
                }
            });
    
            const errorSpan = document.getElementById('experience-error');
            errorSpan.innerText = 'Vsaj eno izkušnjo morate izbrati.';
            errorSpan.style.display = 'inline';
        }
    }

    function scrollToField(fieldId) {
        const fieldElement = document.getElementById(fieldId);
        if (fieldElement) {
            const rect = fieldElement.getBoundingClientRect();
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
                // Scroll to the field smoothly with a 100px offset for visibility
                window.scrollTo({
                    top: window.scrollY + rect.top - 100, // Offset by 100px
                    behavior: 'smooth'
                });
            }
            
            // Focus and select the content of the field after scrolling
            setTimeout(() => {
                fieldElement.focus();
                if (fieldElement.select) {
                    fieldElement.select(); // Select the content if it's an input or textarea
                }
            }, 400); // Delay to ensure scroll completes before selecting
        }
    }

    document.getElementById('job-application-form').addEventListener('submit', function (event) {
        event.preventDefault();
        if (!validateFields()) {
            Swal.fire({
                icon: 'success',
                title: 'Prijava poslana!',
                text: 'Vaša prijava za delovno mesto je bila uspešno poslana.',
            });
            event.target.reset();
        }
    });
});

// Get the button
const scrollToTopButton = document.getElementById("scrollToTop");

// Show or hide the button depending on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopButton.classList.add("show"); // Show button
    } else {
        scrollToTopButton.classList.remove("show"); // Hide button
    }
};

// Smooth scroll to the top when the button is clicked
scrollToTopButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor click behavior
    window.scrollTo({top: 0, behavior: 'smooth'}); // Smooth scroll
});
