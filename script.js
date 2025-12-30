// 🔹 Calculator memory
// firstNumber = + dabane se pehle wala number
// operator = konsa operation select hua (abhi sirf "+")
let firstNumber = null;
let operator = null;

// 🔹 Display input ka reference (jahan numbers dikhte hain)
const display = document.getElementById("number");

// 🔹 Saare buttons ka reference (0-9, +, =, Clear)
const buttons = document.querySelectorAll("button");

// 🔹 Har button pe click listener lagana
// Ye loop sirf ek baar page load pe chalta hai
buttons.forEach((button) => {

  // 🔹 Ye function TAB chalta hai jab koi button click hota hai
  button.addEventListener("click", () => {

    // 🔸 CLEAR BUTTON LOGIC
    // Agar clicked button ka id "clear" hai
    // to display aur memory reset kar do
    if (button.id === "clear") {
      display.value = "";
      firstNumber = null;
      operator = null;
      return; // aage ka code mat chalao
    }

    // 🔹 Button ka text lena (1, 2, +, = etc.)
    const value = button.textContent;

    // 🔸 NUMBER BUTTON LOGIC
    // Agar button ka text number hai
    // to use display ke end me add kar do
    if (!isNaN(value)) {
      display.value += value;
      return;
    }
//--------------------for Plus function------------------
    // 🔸 PLUS (+) BUTTON LOGIC
    // Current display value ko firstNumber me save karo
    // Operator ko "+" set karo
    // Display clear karo taaki next number aa sake
    if (value === "+") {
      firstNumber = Number(display.value); // string → number
      operator = "+";
      display.value = "";
      return;
    }

    // 🔸 EQUAL (=) BUTTON LOGIC
    // Agar operator "+" hai aur "=" dabaya gaya
    // to second number lo aur sum calculate karo
    if (value === "=" && operator === "+") {
      const secondNumber = Number(display.value);
      const sum = firstNumber + secondNumber;
      display.value = sum;


      // 🔹 Calculation ke baad memory reset
      firstNumber = null;
      operator = null;
    }
    //--------------------for Minus function------------------
        if(value === "-")
    {
         if (display.value === "") return;
        firstNumber = Number(display.value);
        operator = "-";
        display.value ="";
        return;
    }

    if (value === "=" && operator === "-")
    {
        const secondNumber = Number(display.value);
        const substract = firstNumber - secondNumber;
        display.value = substract;
        firstNumber = null;
        operator = null;
        return;
    }


//--------------------for Mulitplication function------------------

    if(value==="x"){
    firstNumber = Number(display.value);
    operator= "x";
    display.value="";
    return;
    }
    if(value === "=" && operator ==="x"){
        const secondNumber = Number(display.value);
        const multip = firstNumber * secondNumber;
        display.value = multip;
        firstNumber =null;
        operator=null;
        return;
    }
//--------------------for Division function------------------

    if(value==="/"){
    firstNumber = Number(display.value);
    operator ="/";
    display.value="";
    return;
    }
     if(value==="="&& operator ==="/")
    {
        const secondNumber =Number(display.value);
        const divs = firstNumber / secondNumber;
        display.value = divs;
        firstNumber =null;
        operator=null;
        return;
    }
//--------------------for Modulo function------------------

    if(value==="%")
    {
        firstNumber = Number(display.value);
        operator = "%";
        display.value="";
        return;
    }
    if(value==="="&& operator==="%")
    {const secondNumber =Number(display.value);
        if (secondNumber === 0) {
         display.value = "Error";
         firstNumber = null;
         operator = null;
          return;
        }
        display.value = firstNumber % secondNumber;
        firstNumber=null;
        operator=null;
        return;

    }
//--------------------for backspace function------------------

    if(button.id==="backspace")
    {
        display.value = display.value.slice(0, -1);
        return;
    }


//--------------------for decminal function------------------

    // 🔸 Decimal logic
if (value === ".") {
  // agar display empty hai → "0."
  if (display.value === "") {
    display.value = "0.";
    return;
  }

  // agar pehle se decimal hai → ignore
  if (display.value.includes(".")) {
    return;
  }

  // normal case
  display.value += ".";
  return;
}

//--------------------for plsuminus function------------------


if (value === "±") {
  if (display.value === "") return;

  display.value = String(Number(display.value) * -1);
  return;
}


  });
});
