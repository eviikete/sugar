function calculateDiabetes() {
    let glucose = parseFloat(document.getElementById("glucose").value);
    let resultText = "";

    if (isNaN(glucose) || glucose <= 0) {
        resultText = "Будь ласка, введіть коректне значення!";
    } else if (glucose < 5.6) {
        resultText = "✅ Рівень глюкози в нормі.";
    } else if (glucose >= 5.6 && glucose < 7.0) {
        resultText = "⚠️ Переддіабет (підвищений ризик).";
    } else {
        resultText = "❗ Високий ризик діабету! Зверніться до лікаря.";
    }

    document.getElementById("result").innerText = resultText;
}

function resetForm() {
    document.getElementById("glucose").value = "";
    document.getElementById("result").innerText = "";
}
