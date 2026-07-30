const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch("/submit", {
            method: "POST",
            body: formData
        });

        const text = await response.text();
        console.log("Server Response:", text);

        if (!response.ok) {
            alert("Server Error");
            return;
        }

        let result;

        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Response is not JSON:", text);
            return;
        }

        if (result.success) {
            form.reset();
            window.location.href = "success.html";
        } else {
            alert(result.message);
        }

    } catch (err) {
        console.error(err);
        alert("Something went wrong.");
    }
});

const resume = document.getElementById("resume");
const uploadTitle = document.getElementById("uploadTitle");
const uploadText = document.getElementById("uploadText");

resume.addEventListener("change", function () {
    if (this.files.length > 0) {
        uploadTitle.innerHTML = "✅ Resume Uploaded";
        uploadText.innerHTML = this.files[0].name;
    } else {
        uploadTitle.innerHTML = "Click to upload";
        uploadText.innerHTML = "Upload PDF or Word file.";
    }
});