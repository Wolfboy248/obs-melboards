async function setName(name, isCoop) {
    fetch("/set-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, isCoop: isCoop }),
    });
}

const steamNameValue = document.querySelector("#steamNameValue");
const submitBtn = document.querySelector("#submitBtn");
const isCoopValue = document.querySelector("#isCoopValue");
const linkValue = document.querySelector("#linkValue");
const stopServerBtn = document.querySelector("#stopServerBtn");

stopServerBtn.addEventListener("click", () => {
    stopServer();
    alert("Server stopped!");
    location.reload();
})

async function stopServer() {
    fetch("/shutdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });
}

async function setInitialName() {
    const settings = await fetchFile("./settings.json");

    steamNameValue.value = settings.name
    let toStringIsAdv = settings.isAdv ? "true" : "false";
    isCoopValue.value = toStringIsAdv

}

function copy() {
    linkValue.select();

    navigator.clipboard.writeText(linkValue.value);
    alert("copied!")
}

setInitialName();

async function fetchFile(file) {
    const response = await fetch(file);
    const data = await response.json();
    return data;
}

submitBtn.addEventListener("click", () => {
    if (steamNameValue.value == "") {
        window.alert("Please enter a name!");
        return;
    }

    let isAdv;

    if (isCoopValue.value == "true") {
        isAdv = true;
    } else {
        isAdv = false;
    }

    setName(steamNameValue.value, isAdv);
    window.alert("Name set!");
});
