const imageInput = document.getElementById("imageInput");
const removeBtn = document.getElementById("removeBtn");
const resultImage = document.getElementById("resultImage");
const downloadLink = document.getElementById("downloadLink");

removeBtn.addEventListener("click", async () => {
  const file = imageInput.files[0];

  if (!file) {
    alert("Please select an image file first!");
    return;
  }

  removeBtn.disabled = true;
  removeBtn.textContent = "Processing...";
  resultImage.style.display = "none";
  downloadLink.style.display = "none";

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8001/remove-bg", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    resultImage.src = imageUrl;
    resultImage.style.display = "block";
    
    downloadLink.href = imageUrl;
    downloadLink.download = "removed-bg.png";
    downloadLink.style.display = "inline";
    
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to remove background: " + error.message);
  } finally {
    removeBtn.disabled = false;
    removeBtn.textContent = "Remove Background";
  }
});
