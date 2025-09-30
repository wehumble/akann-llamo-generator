document.getElementById("akanForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const birthdate = document.getElementById("birthdate").value;
    const gender = document.querySelector('input[name="gender"]:checked');

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = ""; // Clear previous result

    // Input validation
    if (!birthdate) {
        resultDiv.textContent = "Please enter a valid birthdate.";
        return;
    }

    if (!gender) {
        resultDiv.textContent = "Please select your gender.";
        return;
    }

    const date = new Date(birthdate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript months are 0-based
    const year = date.getFullYear();

    // Manual extraction
    const CC = Math.floor(year / 100);
    const YY = year % 100;
    const MM = month;
    const DD = day;

    // Validate day and month
    if (DD < 1 || DD > 31 || MM < 1 || MM > 12) {
        resultDiv.textContent = "Invalid day or month.";
        return;
    }

    // Day of the week calculation using the given formula
    const d = Math.floor(((4 * CC - 2 * CC - 1) + (5 * YY / 4) + (26 * (MM + 1) / 10) + DD)) % 7;

    const dayIndex = ((d + 7) % 7); // Normalize negative values

    // Akan names
    const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
    const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

    const selectedGender = gender.value;
    const akanName = selectedGender === "male" ? maleNames[dayIndex] : femaleNames[dayIndex];

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Show result
    resultDiv.innerHTML = `
        You were born on a <strong>${daysOfWeek[dayIndex]}</strong>.<br>
        Your Akan name is <strong>${akanName}</strong>.
    `;
});
