"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
const form = document.getElementById("resume-form");
const downloadButton = document.querySelector(".download-button");
const uploadImageInput = document.getElementById("upload-image");
const profilePicture = document.getElementById("profile-picture");
const shareButton = document.querySelector(".share-button");
// Get user input values
const email = document.getElementById("email").value;
const contact = document.getElementById("contact").value;
const about = document.getElementById("about").value;
const skills = document.getElementById("skills").value.split(",");
// Add event listeners for adding/removing education and experience entries
(_a = document
    .getElementById("add-education-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addEducationEntry);
(_b = document
    .getElementById("add-experience-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", addExperienceEntry);
// Function to add a new education entry
function addEducationEntry() {
    var _a;
    const educationContainer = document.getElementById("education-container");
    const educationEntry = document.createElement("div");
    educationEntry.classList.add("education-entry");
    educationEntry.innerHTML = `
    <input type="text" placeholder="Institute" class="education-institute" required>
    <input type="text" placeholder="Degree" class="education-degree" required>
    <button type="button" class="remove-education-button">Remove Education</button>
  `;
    educationContainer.insertBefore(educationEntry, educationContainer.lastElementChild);
    // Add event listener to the remove button
    (_a = educationEntry
        .querySelector(".remove-education-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        educationEntry.remove();
    });
}
// Function to add a new experience entry
function addExperienceEntry() {
    var _a;
    const experienceContainer = document.getElementById("experience-container");
    const experienceEntry = document.createElement("div");
    experienceEntry.classList.add("experience-entry");
    experienceEntry.innerHTML = ` 
    <input type="text" placeholder="Company Name" class="experience-company" required>
    <input type="text" placeholder="Designation" class="experience-designation" required>
    <button type="button" class="remove-experience-button">Remove Experience</button>
  `;
    experienceContainer.insertBefore(experienceEntry, experienceContainer.lastElementChild);
    // Add event listener to the remove button
    (_a = experienceEntry
        .querySelector(".remove-experience-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        experienceEntry.remove();
    });
}
form.addEventListener("submit", function (event) {
    var _a, _b, _c, _d, _e, _f;
    event.preventDefault();
    // Get user input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact")
        .value;
    const about = document.getElementById("about").value;
    const skills = document.getElementById("skills").value.split(",");
    // Get education entries
    const educationEntries = document.querySelectorAll(".education-entry");
    const educationData = [];
    educationEntries.forEach((entry) => {
        const institute = entry.querySelector(".education-institute").value;
        const degree = entry.querySelector(".education-degree").value;
        educationData.push({ institute, degree });
    });
    // Get experience entries
    const experienceEntries = document.querySelectorAll(".experience-entry");
    const experienceData = [];
    experienceEntries.forEach((entry) => {
        const company = entry.querySelector(".experience-company").value;
        const designation = entry.querySelector(".experience-designation").value;
        experienceData.push({ company, designation });
    });
    // Populate the preview fields
    document.getElementById("preview-name").innerText = name;
    document.getElementById("preview-email").innerText = email;
    document.getElementById("preview-contact").innerText =
        contact;
    // Populate about section
    const aboutElement = (_a = document
        .getElementById("preview-about")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("p")[0];
    if (aboutElement) {
        aboutElement.innerText = about;
    }
    // Update education preview
    const educationPreview = (_b = document
        .getElementById("preview-education")) === null || _b === void 0 ? void 0 : _b.getElementsByTagName("div")[0];
    if (educationPreview) {
        educationPreview.innerHTML = ""; // Clear existing content
        educationData.forEach(({ institute, degree }) => {
            const p = document.createElement("p");
            p.innerText = `${institute}:
       ${degree}`;
            educationPreview.appendChild(p);
        });
    }
    // Update experience preview
    const experiencePreview = (_c = document
        .getElementById("preview-experience")) === null || _c === void 0 ? void 0 : _c.getElementsByTagName("div")[0];
    if (experiencePreview) {
        experiencePreview.innerHTML = ""; // Clear existing content
        experienceData.forEach(({ company, designation }) => {
            const p = document.createElement("p");
            p.innerText = `${company}:
       ${designation}`;
            experiencePreview.appendChild(p);
        });
    }
    // Update skills
    const skillsList = (_d = document
        .getElementById("preview-skills")) === null || _d === void 0 ? void 0 : _d.getElementsByTagName("ul")[0];
    if (skillsList) {
        skillsList.innerHTML = ""; // Clear existing list
        skills.forEach((skill) => {
            const li = document.createElement("li");
            li.textContent = skill.trim();
            skillsList.appendChild(li);
        });
    }
    // Update languages list
    const languageInput = (_e = document.getElementById("languages")) === null || _e === void 0 ? void 0 : _e.value;
    const languages = languageInput ? languageInput.split(",") : [];
    const languageList = (_f = document
        .getElementById("preview-languages")) === null || _f === void 0 ? void 0 : _f.getElementsByTagName("ul")[0];
    if (languageList) {
        languageList.innerHTML = ""; // Clear existing list
        languages.forEach((language) => {
            const li = document.createElement("li");
            li.textContent = language.trim();
            languageList.appendChild(li);
        });
    }
    // Share Functionality
    shareButton === null || shareButton === void 0 ? void 0 : shareButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        if (navigator.share) {
            try {
                yield navigator.share({
                    title: 'My Resume',
                    text: 'Check out my resume!',
                    url: document.URL,
                });
                console.log('Resume shared successfully!');
            }
            catch (err) {
                console.error('Error sharing:', err);
            }
        }
        else {
            alert("Sharing is not supported in this browser.");
        }
    }));
    const backToFormButton = document.querySelector(".back-to-form-button");
    backToFormButton.addEventListener("click", function () {
        previewPage.style.display = "none";
        formPage.style.display = "block";
    });
});
// Get references to the form, preview sections, and the button
const formPage = document.getElementById("form-page");
const previewPage = document.getElementById("preview-page");
const GenerateResumeButton = document.getElementById("generate-resume-button");
// When the 'Generate Resume' button is clicked, switch to preview page
GenerateResumeButton.addEventListener("click", function () {
    // First, trigger the form submission functionality to populate preview data
    form.dispatchEvent(new Event("submit"));
    // Hide the form page and show the preview page
    formPage.style.display = "none";
    previewPage.style.display = "block";
});
// Image upload functionality
uploadImageInput.addEventListener("change", function () {
    var _a;
    const file = (_a = uploadImageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePicture.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
});
let isEditing = false;
// Selecting buttons
const editButton = document.querySelector(".edit-button");
const saveButton = document.querySelector(".save-button");
// Enable editing function
function enableEditing() {
    isEditing = true;
    const sections = document.querySelectorAll("#resume-content p, #resume-content h2, #resume-content h3, #resume-content ul");
    sections.forEach((section) => {
        section.setAttribute("contenteditable", "true");
        section.classList.add("editable");
    });
    document.getElementById("resume-content").style.pointerEvents = "auto";
}
// Save changes function
function saveChanges() {
    var _a;
    if (isEditing) {
        const name = document.getElementById("preview-name")
            .innerText;
        const email = document.getElementById("preview-email")
            .innerText;
        const previewAboutElement = (_a = document
            .getElementById("preview-about")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("p")[0];
        const about = previewAboutElement ? previewAboutElement.innerText : "";
        // Optional: you can log these to verify
        console.log("Saved Resume Data:", { name, email, about });
        alert("Resume changes saved successfully!");
        // Disable editing
        disableEditing();
    }
}
// Disable editing function
function disableEditing() {
    isEditing = false;
    const sections = document.querySelectorAll("#resume-content .editable");
    sections.forEach((section) => {
        section.setAttribute("contenteditable", "false");
        section.classList.remove("editable");
    });
}
// Adding event listeners for edit and save buttons
editButton === null || editButton === void 0 ? void 0 : editButton.addEventListener("click", function () {
    if (!isEditing) {
        enableEditing();
    }
    else {
        alert("You are already in edit mode!");
    }
});
saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener("click", saveChanges);
// Download functionality
downloadButton.addEventListener("click", function () {
    const resumeContent = document.getElementById("resume-content");
    const opt = {
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    if (resumeContent) {
        html2pdf().from(resumeContent).set(opt).save();
    }
});
// Import `html2pdf` if you're modularizing (otherwise skip this if it's globally included)
// Targeting the download button
(_c = document.querySelector(".download-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    // Get user name from input field
    const userName = document.getElementById("name").value;
    // Get the resume container
    const resumeContainer = document.getElementById("resume-container");
    if (resumeContainer && userName) {
        // PDF options
        const options = {
            margin: [10, 10, 10, 10], // Narrow margins for A4 sizing
            filename: `${userName}_Resume.pdf`, // Custom filename
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // A4 size, portrait mode
        };
        // Convert only the resume container to PDF
        html2pdf().set(options).from(resumeContainer).save();
    }
    else {
        alert("Please enter your name to download the resume.");
    }
});
