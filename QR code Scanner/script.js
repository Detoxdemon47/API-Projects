const wrapper = document.querySelector(".wrapper");
const form = wrapper.querySelector("form");
const fileInp = form.querySelector("input");
const infoText = form.querySelector("p");
const copyBtn = wrapper.querySelector(".copy");
const closeBtn = wrapper.querySelector(".close");

function fetchRequest(formData, file){
    infoText.innerHTML = "Scanning QR Code...";
    // sending post request to qr server api with passing
    // form data as body and getting responce from it
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST",
        body: formData
    }).then(responce => responce.json()).then(result => {
        result = result[0].symbol[0].data;
        console.log(result);
        infoText.innerHTML = result ? "Upload QR code to Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        wrapper.querySelector("textarea").innerHTML = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch( () => {
        inforText.innerHTML = "Couldn't Scan QR Code";
    });
}

fileInp.addEventListener("change", e => {
    let file = e.target.files[0]; // getting user uplaoded file
    if(!file) return;
    let formData = new FormData(); // creating new FormData object
    formData.append("file", file); // adding selected file to formData
    fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active");
});
