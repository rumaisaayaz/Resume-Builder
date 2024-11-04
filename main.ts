declare var html2pdf: any;

const form = document.getElementById("resume-form") as HTMLFormElement;
const downloadButton = document.querySelector(
  ".download-button"
) as HTMLButtonElement;
const uploadImageInput = document.getElementById(
  "upload-image"
) as HTMLInputElement;
const profilePicture = document.getElementById(
  "profile-picture"
) as HTMLImageElement;
const shareButton = document.querySelector(
  ".share-button"
) as HTMLButtonElement | null;

//user input values
const email = (document.getElementById("email") as HTMLInputElement).value;
const contact = (document.getElementById("contact") as HTMLInputElement).value;
const about = (document.getElementById("about") as HTMLTextAreaElement).value;
const skills = (
  document.getElementById("skills") as HTMLInputElement
).value.split(",");
// event listeners for adding/removing education and experience entries
document
  .getElementById("add-education-button")
  ?.addEventListener("click", addEducationEntry);
document
  .getElementById("add-experience-button")
  ?.addEventListener("click", addExperienceEntry);

// Function to add a new education entry
function addEducationEntry() {
  const educationContainer = document.getElementById(
    "education-container"
  ) as HTMLElement;
  const educationEntry = document.createElement("div");
  educationEntry.classList.add("education-entry");
  educationEntry.innerHTML = `
    <input type="text" placeholder="Institute" class="education-institute" required>
    <input type="text" placeholder="Degree" class="education-degree" required>
    <button type="button" class="remove-education-button">Remove Education</button>
  `;
  educationContainer.insertBefore(
    educationEntry,
    educationContainer.lastElementChild
  );

  // event listener to the remove button
  educationEntry
    .querySelector(".remove-education-button")
    ?.addEventListener("click", function () {
      educationEntry.remove();
    });
}

// Function to add a new experience entry
function addExperienceEntry() {
  const experienceContainer = document.getElementById(
    "experience-container"
  ) as HTMLElement;
  const experienceEntry = document.createElement("div");
  experienceEntry.classList.add("experience-entry");
  experienceEntry.innerHTML = ` 
    <input type="text" placeholder="Company Name" class="experience-company" required>
    <input type="text" placeholder="Designation" class="experience-designation" required>
    <button type="button" class="remove-experience-button">Remove Experience</button>
  `;
  experienceContainer.insertBefore(
    experienceEntry,
    experienceContainer.lastElementChild
  );

  // event listener to the remove button
  experienceEntry
    .querySelector(".remove-experience-button")
    ?.addEventListener("click", function () {
      experienceEntry.remove();
    });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  //user input values
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("contact") as HTMLInputElement)
    .value;
  const about = (document.getElementById("about") as HTMLTextAreaElement).value;
  const skills = (
    document.getElementById("skills") as HTMLInputElement
  ).value.split(",");

  // Get education entries
  const educationEntries = document.querySelectorAll(".education-entry");
  const educationData: { institute: string; degree: string }[] = [];
  educationEntries.forEach((entry) => {
    const institute = (
      entry.querySelector(".education-institute") as HTMLInputElement
    ).value;
    const degree = (
      entry.querySelector(".education-degree") as HTMLInputElement
    ).value;
    educationData.push({ institute, degree });
  });

  //experience entries
  const experienceEntries = document.querySelectorAll(".experience-entry");
  const experienceData: { company: string; designation: string }[] = [];
  experienceEntries.forEach((entry) => {
    const company = (
      entry.querySelector(".experience-company") as HTMLInputElement
    ).value;
    const designation = (
      entry.querySelector(".experience-designation") as HTMLInputElement
    ).value;
    experienceData.push({ company, designation });
  });

  // Populate

  (document.getElementById("preview-name") as HTMLElement).innerText = name;
  (document.getElementById("preview-email") as HTMLElement).innerText = email;
  (document.getElementById("preview-contact") as HTMLElement).innerText =
    contact;

  const aboutElement = document
    .getElementById("preview-about")
    ?.getElementsByTagName("p")[0];
  if (aboutElement) {
    aboutElement.innerText = about;
  }

  // Update education preview
  const educationPreview = document
    .getElementById("preview-education")
    ?.getElementsByTagName("div")[0];
  if (educationPreview) {
    educationPreview.innerHTML = "";
    educationData.forEach(({ institute, degree }) => {
      const p = document.createElement("p");
      p.innerText = `${institute}:
       ${degree}`;
      educationPreview.appendChild(p);
    });
  }

  // Update experience preview
  const experiencePreview = document
    .getElementById("preview-experience")
    ?.getElementsByTagName("div")[0];
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
  const skillsList = document
    .getElementById("preview-skills")
    ?.getElementsByTagName("ul")[0];
  if (skillsList) {
    skillsList.innerHTML = "";
    skills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill.trim();
      skillsList.appendChild(li);
    });
  }

  // Update languages list
  const languageInput = (
    document.getElementById("languages") as HTMLTextAreaElement
  )?.value;
  const languages = languageInput ? languageInput.split(",") : [];
  const languageList = document
    .getElementById("preview-languages")
    ?.getElementsByTagName("ul")[0];
  if (languageList) {
    languageList.innerHTML = "";
    languages.forEach((language) => {
      const li = document.createElement("li");
      li.textContent = language.trim();
      languageList.appendChild(li);
    });
  }

  // Share Functionality
  shareButton?.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Resume",
          text: "Check out my resume!",
          url: document.URL,
        });
        console.log("Resume shared successfully!");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  });
  // back to form
  const backToFormButton = document.querySelector(
    ".back-to-form-button"
  ) as HTMLButtonElement;
  backToFormButton.addEventListener("click", function () {
    previewPage.style.display = "none";
    formPage.style.display = "block";
  });
});

const formPage = document.getElementById("form-page") as HTMLElement;
const previewPage = document.getElementById("preview-page") as HTMLElement;
const GenerateResumeButton = document.getElementById(
  "generate-resume-button"
) as HTMLButtonElement;

GenerateResumeButton.addEventListener("click", function () {
  form.dispatchEvent(new Event("submit"));

  // Hide the form and show the preview page
  formPage.style.display = "none";
  previewPage.style.display = "block";
});

// Image functionality
uploadImageInput.addEventListener("change", function () {
  const file = uploadImageInput.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePicture.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
});

let isEditing = false;

// Selecting buttons
const editButton = document.querySelector(
  ".edit-button"
) as HTMLButtonElement | null;
const saveButton = document.querySelector(
  ".save-button"
) as HTMLButtonElement | null;

// editing function
function enableEditing() {
  isEditing = true;
  const sections = document.querySelectorAll(
    "#resume-content p, #resume-content h2, #resume-content h3, #resume-content ul"
  );

  sections.forEach((section) => {
    section.setAttribute("contenteditable", "true");
    section.classList.add("editable");
  });

  document.getElementById("resume-content")!.style.pointerEvents = "auto";
}

// Save changes function
function saveChanges() {
  if (isEditing) {
    const name = (document.getElementById("preview-name") as HTMLElement)
      .innerText;
    const email = (document.getElementById("preview-email") as HTMLElement)
      .innerText;
    const previewAboutElement = document
      .getElementById("preview-about")
      ?.getElementsByTagName("p")[0];
    const about = previewAboutElement ? previewAboutElement.innerText : "";

    console.log("Saved Resume Data:", { name, email, about });
    alert("Resume changes saved successfully!");

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

editButton?.addEventListener("click", function () {
  if (!isEditing) {
    enableEditing();
  } else {
    alert("You are already in edit mode!");
  }
});

saveButton?.addEventListener("click", saveChanges);

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

document.querySelector(".download-button")?.addEventListener("click", () => {
  // Get user name from input field
  const userName = (document.getElementById("name") as HTMLInputElement).value;

  // Get the resume container
  const resumeContainer = document.getElementById("resume-container");

  if (resumeContainer && userName) {
    // PDF options
    const options = {
      margin: [10, 10, 10, 10],
      filename: `${userName}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(resumeContainer).save();
  } else {
    alert("Please enter your name to download the resume.");
  }
});
