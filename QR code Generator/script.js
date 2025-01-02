const wrapper = document.querySelector(".wrapper");
const input = document.querySelector("input");
const btn = document.querySelector("#btn");
const qrimg = document.querySelector(".code img");

btn.addEventListener("click", () => {
    let inputValue = input.value;
    if(!inputValue) return;

    btn.innerText = "Generating QR Code...";

    qrimg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;

    qrimg.addEventListener("load", () => {
    wrapper.classList.add("active");
    btn.innerText = "Generate QR";
    });
});

input.addEventListener("keyup", () => {
    if(!input.value){
        wrapper.classList.remove("active");
    }
});