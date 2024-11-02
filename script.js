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
        { id: 'croatian', errorMessage: 'Izberite ustrezno stopnjo znanja hrvaškega jezika.' },
        { id: 'start-date', errorMessage: 'Vnesite veljaven datum začetka dela.' },
        { id: 'status', errorMessage: 'Izberite ustrezen zaposlitveni status.' },
        { id: 'file-upload', errorMessage: 'Neveljaven ali manjkajoč življenjepis.' },
        { id: 'privacy', errorMessage: 'S politiko zasebnosti se morate strinjati za nadaljevanje.', isCheckbox: true },
    ];

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
        const experienceCheckboxes = document.querySelectorAll('input[name="experience"]');
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
                // Scroll to the field smoothly, and add an offset for better visibility
                window.scrollTo({
                    top: window.scrollY + rect.top - 100, // Offset by 100px for clarity
                    behavior: 'smooth'
                });
            }
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
