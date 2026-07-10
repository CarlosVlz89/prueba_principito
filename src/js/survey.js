/* survey.js - Survey Form Validation, Submission, and Privacy Notice */
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function initSurvey() {
  const form = document.getElementById("community-survey-form");
  const formCard = document.getElementById("form-card-body");
  const successSection = document.getElementById("survey-success-message");
  const privacyLink = document.getElementById("open-privacy-modal");
  const privacyModal = document.getElementById("privacy-modal");
  const closePrivacy = document.getElementById("close-privacy-modal");
  const acceptPrivacyBtn = document.getElementById("accept-privacy-btn");
  const consentCheckbox = document.getElementById("consent");

  // Privacy Modal Event Listeners
  if (privacyLink && privacyModal) {
    privacyLink.addEventListener("click", (e) => {
      e.preventDefault();
      privacyModal.classList.add("open");
      document.body.style.overflow = "hidden"; // Prevent body scroll
    });
  }

  function closeModal() {
    if (privacyModal) {
      privacyModal.classList.remove("open");
      document.body.style.overflow = ""; // Re-enable body scroll
    }
  }

  if (closePrivacy) {
    closePrivacy.addEventListener("click", closeModal);
  }

  if (acceptPrivacyBtn) {
    acceptPrivacyBtn.addEventListener("click", () => {
      if (consentCheckbox) {
        consentCheckbox.checked = true;
      }
      closeModal();
    });
  }

  if (privacyModal) {
    privacyModal.addEventListener("click", (e) => {
      if (e.target === privacyModal) {
        closeModal();
      }
    });
  }

  // Form Submission Logic
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Basic Validation
      const name = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const source = document.getElementById("source").value;
      const attendsBallet = document.getElementById("attends-ballet").value;
      const newsletter = document.getElementById("newsletter").checked;
      const consent = consentCheckbox ? consentCheckbox.checked : false;

      if (!name || !email || !consent) {
        alert("Por favor, completa todos los campos obligatorios y acepta el aviso de privacidad.");
        return;
      }

      // Collect data
      const surveyResponse = {
        name,
        email,
        source,
        attendsBallet,
        newsletter,
        timestamp: serverTimestamp() // Use Firebase server timestamp for security and accuracy
      };

      // Show submitting state on button
      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      try {
        // Save to Firebase Cloud Firestore
        await addDoc(collection(db, "surveys"), surveyResponse);

        // Hide form and show success message
        if (formCard && successSection) {
          formCard.style.display = "none";
          successSection.style.display = "block";
          successSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch (error) {
        console.error("Error al enviar la encuesta:", error);
        alert("Ocurrió un error al enviar la encuesta. Por favor, asegúrate de que la base de datos Firestore esté activa en tu consola.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
}
