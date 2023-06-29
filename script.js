let slider = document.getElementById("photoSlider");
let photos = Array.from(slider.querySelectorAll("img"));
let hours = document.getElementById('hoursInfo')
let hoursBtn = document.getElementById('hoursDropdown')
let meatSlider = document.getElementById('meatSlider')
let meats = Array.from(document.querySelectorAll('.meat'))

hoursBtn.addEventListener("click", ()=>{
    if (hours.classList.contains('visible')) {
        hoursBtn.querySelector('i').classList.remove('fa-angle-up')
        hoursBtn.querySelector('i').classList.add('fa-angle-down')
    } else {
        hoursBtn.querySelector('i').classList.remove('fa-angle-down')
        hoursBtn.querySelector('i').classList.add('fa-angle-up')
    }
    hours.classList.toggle("visible")
})

fetch('https://elviejonmenu.vercel.app/api/menu/', {method: 'GET', headers: {"Content-Type": "application/json", "Accept": "application/json"}})
        .then(response => response.json())
        .then(parsed => {
            parsed.forEach(entry => {
                document.getElementById('menu').innerHTML += `
                <article class="${"menuItem "+entry.type}">
                    <h3>${String(entry.item).toUpperCase()}</h3>
                    <p>$${entry.price}</p>
                </article>
                `
            }
            )
            
        })
        .catch(console.log)

let i = 0;
setInterval(()=>{
    const p = window.innerWidth < 1000 ? photos.filter(x=>(!x.classList.contains('landscape'))) : photos
    i === p.length
        ? i = 0
        : null;
    const notFocused = [...p];
    notFocused.splice(i,1)
    notFocused.forEach(photo => {
        photo.style.flex = '1';
        photo.style.filter = 'brightness(50%)'
        photo.style.scale = '1'
    })
    p[i].style.flex = '15';
    p[i].style.filter = 'none'
    p[i].style.scale = '1.1'
    i++;
}, 4000)

function checkOpen() {
    const sign = document.querySelector('nav button');
    let today = new Date();
    let wknd = (today.getDay() === 6 || today.getDay() === 7)
    let closing = wknd ? 23 : 22;
    let hr = today.getHours();
    let open = (hr >= 10 && hr <= closing)
    let olatheOnly = (today.getDay() === 1 || hr < 16);
    if (open) {
        sign.innerHTML = olatheOnly ? "OPEN*<p class='caveat'>Olathe Only</p>" : "OPEN"
    } else {
        sign.innerHTML = "CLOSED"
    }
    console.log(hr)
}

setInterval(checkOpen, 60000)
checkOpen();