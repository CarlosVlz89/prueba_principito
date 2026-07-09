/* survey.js - Survey Form Validation, Submission, and Privacy Notice */

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
    form.addEventListener("submit", (e) => {
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
        timestamp: new Date().toISOString()
      };

      // Show submitting state on button
      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      // Simulate API call (1.5 seconds)
      setTimeout(() => {
        // Save to LocalStorage
        saveSurveyResponse(surveyResponse);

        // Hide form and show success message
        if (formCard && successSection) {
          formCard.style.display = "none";
          successSection.style.display = "block";
          successSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 1500);
    });
  }

  // Helper function to save survey in localStorage
  function saveSurveyResponse(response) {
    const key = "ardentia_survey_responses";
    let existingResponses = localStorage.getItem(key);
    
    if (existingResponses) {
      existingResponses = JSON.parse(existingResponses);
    } else {
      existingResponses = [];
    }

    existingResponses.push(response);
    localStorage.setItem(key, JSON.stringify(existingResponses));
  }
}

// Hidden Feature: Export data as CSV by double-clicking the footer copyright or logo
export function initDataExporter() {
  const exportTrigger = document.getElementById("export-data-trigger");
  if (!exportTrigger) return;

  exportTrigger.addEventListener("dblclick", () => {
    const key = "ardentia_survey_responses";
    const data = localStorage.getItem(key);

    if (!data || JSON.parse(data).length === 0) {
      alert("Aún no hay respuestas de encuestas registradas en este navegador.");
      return;
    }

    const responses = JSON.parse(data);
    
    // Create CSV Header
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nombre,Correo Electronico,Medio de Entero,Asiste al Ballet,Suscripcion Boletin,Fecha Registro\n";

    // Add rows
    responses.forEach(row => {
      const escapedName = `"${row.name.replace(/"/g, '""')}"`;
      const escapedEmail = `"${row.email.replace(/"/g, '""')}"`;
      const escapedSource = `"${row.source.replace(/"/g, '""')}"`;
      const escapedAttends = `"${row.attendsBallet.replace(/"/g, '""')}"`;
      const newsletterText = row.newsletter ? "Sí" : "No";
      const dateText = new Date(row.timestamp).toLocaleDateString();

      csvContent += `${escapedName},${escapedEmail},${escapedSource},${escapedAttends},${newsletterText},${dateText}\n`;
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `encuestas_el_nino_que_cabalga_asteroides_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Se han exportado ${responses.length} respuestas exitosamente.`);
  });
}
