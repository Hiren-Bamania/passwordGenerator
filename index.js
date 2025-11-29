const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
"0","1","2","3","4","5","6","7","8","9",
"~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

const outA = document.getElementById("outA");
const outB = document.getElementById("outB");
const copyA = document.getElementById("copyA");
const copyB = document.getElementById("copyB");
const msgA = document.getElementById("msgA");
const msgB = document.getElementById("msgB");
const generateBtn = document.getElementById("generateBtn");

// start with blank values
outA.textContent = "";
outB.textContent = "";
msgA.textContent = "";
msgB.textContent = "";

// make password
function getPassword(length = 14) {
    let pwd = "";
    for (let i = 0; i < length; i++) {
        pwd += characters[Math.floor(Math.random() * characters.length)];
    }
    return pwd;
}

// generate passwords
function generate() {
    outA.textContent = getPassword();
    outB.textContent = getPassword();
    msgA.textContent = "";
    msgB.textContent = "";
}

// copy function
function copyToClipboard(text, messageElement) {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);

    messageElement.textContent = "Password copied!";
    setTimeout(function () {
        messageElement.textContent = "";
    }, 2000);
}

// copy buttons
copyA.onclick = function () {
    if (outA.textContent !== "") {
        copyToClipboard(outA.textContent, msgA);
    }
};

copyB.onclick = function () {
    if (outB.textContent !== "") {
        copyToClipboard(outB.textContent, msgB);
    }
};

// generate button
generateBtn.onclick = generate;
