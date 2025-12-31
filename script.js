// ================================
// 🔹 Calculator Memory
// ================================
let firstNumber = null;
let operator = null;

// ================================
// 🔹 DOM References
// ================================
const display = document.getElementById("number");
const buttons = document.querySelectorAll("button");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
console.log(clearHistoryBtn);

// ================================
// 🔹 HISTORY FUNCTIONS (GLOBAL)
// ================================
function saveToHistory(record) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.push(record);
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

function loadHistory() {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyList.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function clearHistory() {
  localStorage.removeItem("calcHistory");
  historyList.innerHTML = "";
}

// ================================
// 🔹 BUTTON CLICK HANDLER
// ================================
buttons.forEach((button) => {
  button.addEventListener("click", () => {

    const value = button.textContent;

    // 🔸 CLEAR (AC)
    if (button.id === "clear") {
      display.value = "";
      firstNumber = null;
      operator = null;
      return;
    }

    // 🔸 BACKSPACE
    if (button.id === "backspace") {
      display.value = display.value.slice(0, -1);
      return;
    }

    // 🔸 NUMBER BUTTONS
    if (!isNaN(value)) {
      display.value += value;
      return;
    }

    // 🔸 DECIMAL
    if (value === ".") {
      if (display.value === "") {
        display.value = "0.";
        return;
      }
      if (display.value.includes(".")) return;
      display.value += ".";
      return;
    }

    // 🔸 PLUS / MINUS TOGGLE
    if (value === "±") {
      if (display.value === "") return;
      display.value = String(Number(display.value) * -1);
      return;
    }

    // ================================
    // 🔹 OPERATORS
    // ================================
    if (["+", "-", "x", "/", "%"].includes(value)) {
      if (display.value === "") return;
      firstNumber = Number(display.value);
      operator = value;
      display.value = "";
      return;
    }

    // ================================
    // 🔹 EQUAL (=)
    // ================================
    if (value === "=" && operator !== null) {
      const secondNumber = Number(display.value);
      let result;

      switch (operator) {
        case "+":
          result = firstNumber + secondNumber;
          break;

        case "-":
          result = firstNumber - secondNumber;
          break;

        case "x":
          result = firstNumber * secondNumber;
          break;

        case "/":
          if (secondNumber === 0) {
            display.value = "Error";
            firstNumber = null;
            operator = null;
            return;
          }
          result = firstNumber / secondNumber;
          break;

        case "%":
          if (secondNumber === 0) {
            display.value = "Error";
            firstNumber = null;
            operator = null;
            return;
          }
          result = firstNumber % secondNumber;
          break;
      }

      display.value = result;
      saveToHistory(`${firstNumber} ${operator} ${secondNumber} = ${result}`);

      firstNumber = null;
      operator = null;
      return;
    }
  });
});

// ================================
// 🔹 ON PAGE LOAD
// ================================
window.addEventListener("load", loadHistory);
clearHistoryBtn.addEventListener("click", clearHistory);
