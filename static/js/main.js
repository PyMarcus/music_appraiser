const toggleElementDisplay = (elementId, display) => {
  const element = document.querySelector(`#${elementId}`);
  display
    ? element.classList.remove("hidden")
    : element.classList.add("hidden");
};

const displayLoadingSpinner = (display) =>
  toggleElementDisplay("loading-spinner", display);

const displayResultImage = (display) =>
  toggleElementDisplay("result-image", display);

const uploadImage = async (formData) => {
  try {
    const result = await fetch("/upload", { method: "POST", body: formData });
    if (result.ok) displayResultImage(true);
    location.reload();
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    displayLoadingSpinner(false);
  }
};

const processFile = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([e.target.result], { type: "application/octet-stream" }),
      file.name
    );

    uploadImage(formData);
  };
  reader.readAsArrayBuffer(file);
};

const inputElement = document.querySelector("#upload-input");
inputElement.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file || file.type !== "text/csv") {
    return alert("Arquivo inválido. Por favor, selecione um arquivo CSV");
  }

  displayResultImage(false);
  displayLoadingSpinner(true);

  processFile(file);
});
