const popup = document.querySelector(".popup");
const wifiIcon = document.querySelector(".icon i");
const popupTitle = document.querySelector(".popup .title");
const popupDesc = document.querySelector(".desc");
const reconnectBtn = document.querySelector(".reconnect");



let isOnline = true;
let intervalId; 
let timer = 10;

const checkConnection = async () => {
    try{
        
        const responce = await fetch("https://jsonplaceholder.typicode.com/posts");

        isOnline = responce.status >= 200 && responce.status <=300;

    }catch(error){
        isOnline = false;
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    if(status){
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerHTML = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet";
        popup.classList.add("online");
        return setTimeout( () => popup.classList.remove("show"),2000);

    }else{

        wifiIcon.className = "uil uil-wifi-slash";
        popupTitle.innerHTML = "Lost Connection";
        popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
        popup.className = "popup show";

        intervalId = setInterval( () => {
            timer--;
            if(timer === 0){
                checkConnection();
            }
            popup.querySelector(".desc b").innerText = timer;
        }, 1000);
    }
}

setInterval( () => isOnline && checkConnection(), 3000);

reconnectBtn.addEventListener("click", checkConnection);