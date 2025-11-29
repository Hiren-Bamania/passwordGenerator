const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
"0","1","2","3","4","5","6","7","8","9",
"~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

// DOM elements (make sure these IDs exist in your HTML)
const outA = document.getElementById("outA");
const outB = document.getElementById("outB");
const copyA = document.getElementById("copyA");
const copyB = document.getElementById("copyB");
const msgA = document.getElementById("msgA");
const msgB = document.getElementById("msgB");
const generateBtn = document.getElementById("generateBtn");
const lengthInput = document.getElementById("length");         // <input id="length" ...>
const includeSymbols = document.getElementById("includeSymbols"); // <input id="includeSymbols" type="checkbox">
const includeNumbers = document.getElementById("includeNumbers"); // <input id="includeNumbers" type="checkbox">

// start blank
outA.textContent = "";
outB.textContent = "";
msgA.textContent = "";
msgB.textContent = "";

// helper: split the provided characters array into categories
const letters = characters.filter(ch => /[A-Za-z]/.test(ch));
const numbers = characters.filter(ch => /[0-9]/.test(ch));
const symbols = characters.filter(ch => /[^A-Za-z0-9]/.test(ch));

function buildPool() {
  // always include letters
  let pool = letters.slice(); // copy
  // add numbers/symbols depending on checkboxes
  if (includeNumbers && includeNumbers.checked) {
    pool = pool.concat(numbers);
  }
  if (includeSymbols && includeSymbols.checked) {
    pool = pool.concat(symbols);
  }
  // fallback: if pool ends up empty (shouldn't happen), use full characters
  if (pool.length === 0) pool = characters.slice();
  return pool;
}

// generate a random password using the pool
function getPassword(length = 14) {
  const pool = buildPool();
  let pwd = "";
  // ensure length is a positive integer and not too large
  const len = Math.max(1, Math.min(128, Number(length) || 14));
  for (let i = 0; i < len; i++) {
    const r = Math.floor(Math.random() * pool.length);
    pwd += pool[r];
  }
  return pwd;
}

// generate two passwords and clear messages
function generate() {
  const len = lengthInput ? Number(lengthInput.value) || 14 : 14;
  outA.textContent = getPassword(len);
  outB.textContent = getPassword(len);
  msgA.textContent = "";
  msgB.textContent = "";
}

// fallback copy method that works on file:// and normal pages
function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
  } catch (e) {
    // ignore
  }
  document.body.removeChild(area);
}

// copy helper: try Clipboard API first, then fallback
function copyToClipboard(text) {
  return new Promise((resolve) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => resolve(true)).catch(() => {
        fallbackCopy(text);
        resolve(true);
      });
    } else {
      fallbackCopy(text);
      resolve(true);
    }
  });
}

// copy handlers that show message next to their row
copyA.onclick = function () {
  if (!outA.textContent) return;
  copyToClipboard(outA.textContent).then(() => {
    msgA.textContent = "Password copied!";
    // hide after 2 seconds
    setTimeout(function () { msgA.textContent = ""; }, 2000);
  });
};

copyB.onclick = function () {
  if (!outB.textContent) return;
  copyToClipboard(outB.textContent).then(() => {
    msgB.textContent = "Password copied!";
    setTimeout(function () { msgB.textContent = ""; }, 2000);
  });
};

// generate button
generateBtn.onclick = generate;

// optional: if user changes checkboxes or length while passwords are shown,
// you might want to clear them so it's obvious they must generate again.
// This is simple and beginner-friendly:
if (includeSymbols) includeSymbols.onchange = function () { outA.textContent = ""; outB.textContent = ""; };
if (includeNumbers) includeNumbers.onchange = function () { outA.textContent = ""; outB.textContent = ""; };
if (lengthInput) lengthInput.oninput = function () { outA.textContent = ""; outB.textContent = ""; };