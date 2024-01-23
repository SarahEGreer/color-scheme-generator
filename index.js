let colorsArray = []
let colorPicker = document.getElementById("color-picker")
let colorPickerValue = document.getElementById("color-picker").value.slice(1)
let colorScheme = document.getElementById("color-scheme-select")
const defaultColor = "#FFB627"

window.addEventListener("load", () => {
    reset()
    getColorScheme()
})

colorPicker.addEventListener("change", e => {
    colorPickerValue = e.target.value.slice(1)
})

document.getElementById("color-scheme-form").addEventListener("submit", function (e) {
    e.preventDefault()
    getColorScheme()
})

document.addEventListener("click", async (e) => {
    if (e.target.dataset.color) {
        await navigator.clipboard.writeText(e.target.textContent)
        showModalBox(e.target.dataset.color)
    }

})

function reset() {
    colorPicker.value = defaultColor
    colorPickerValue = defaultColor.slice(1)
    colorScheme.value = "monochrome"
}

function getColorScheme() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPickerValue}&mode=${colorScheme.value}`)
        .then(res => res.json())
        .then(data => {
            colorsArray = data.colors
            renderColors()
        })
}

function renderColors() {
    let html = ""
    for (let color of colorsArray) {
        let hexValue = color.hex.value
        let hexClean = color.hex.clean
        html += `
        <div class="color-container">
            <div class="color" style="background-color:${hexValue}"></div>
            <div class="label-container flex">
                <div class="color-label" data-color="${hexClean}">${hexValue}</div>
                <div class="modal-box" id="${hexClean}">${hexValue} copied!</div>
            </div>
        </div>
    `
    }
    document.getElementById("color-scheme-display").innerHTML = html
}

function showModalBox(colorModal) {
    document.getElementById(colorModal).style.display = "block"
    setTimeout(() => {
        document.getElementById(colorModal).style.display = "none"
    }, 1300)
}