const form = document.getElementById('validateUser')
const editBox = document.getElementById('editBox')

const menu = document.createElement('section', );
menu.setAttribute("id", "menu")
let code;

function resetAll() {
    form.reset()
    editBox.innerHTML = ''
    menu.innerHTML = ''
}


form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const {username, password} = form;
    code = `Basic ${btoa(username.value+":"+password.value)}`;
    fetch('https://elviejonmenu.vercel.app/api/menu/edit', {method: 'GET', headers: {"Content-Type": "application/json", "Accept": "application/json", "Authorization": code}})
        .then(response => response.json())
        .then(parsed => {
            console.log(parsed)
            parsed.forEach(entry => {
                menu.innerHTML += `
                <div>
                <label>
                    <input type='text' value="${entry.item}" class='item'/>
                </label>
                <label>
                    <input type='text' value="${entry.price}" class='price'/>
                </label>
                <label>
                    <select class='itemType'>
                        <option value='food'>Food</option>
                        <option value='drink'>Drink</option>
                    </select>
                </label>
                </div>
                `
            });
            for (let i=0; i<3; i++) {
                menu.innerHTML += `
            <div>
                <label>
                    <input type='text' class='item'/>
                </label>
                <label>
                    <input type='text' class='price'/>
                </label>
                <label>
                    <select class='itemType'>
                        <option value='food'>Food</option>
                        <option value='drink'>Drink</option>
                    </select>
                </label>

            </div>`
            }
            menu.innerHTML += `
                <button onclick='handleSubmit()'>Submit Changes</button>
            `;
            editBox.appendChild(menu)
            const selects = document.querySelectorAll('select');
            console.log(selects)
            for (let i = 0; i<parsed.length; i++) {
                idx = parsed[i].type == 'food' ? 0 : 1
                selects[i].options[idx].setAttribute("selected", "")
                console.log(i, parsed[i].type)
            }
            editBox.innerHTML += 
            `<div class='centerDiv'><button id='cancelEdit' 
                onclick="resetAll()">Cancel</button></div>`
            form.reset()
        })
        .catch(console.log)
})

function handleSubmit() {
    console.log("triggered")
    const menuItems = document.querySelectorAll('.item');
    const menuPrices = document.querySelectorAll('.price');
    const menuTypes = document.querySelectorAll('.itemType');
    const updatedMenu = [];
    console.log(updatedMenu);
    for (let i=0; i<menuItems.length; i++) {
        if (menuItems[i].value !== '') {
            updatedMenu.push(
                {
                    item: menuItems[i].value,
                    price: menuPrices[i].value,
                    type: menuTypes[i].value
                }
            )
        }
    }
    fetch('https://elviejonmenu.vercel.app/api/menu', {method: 'POST', headers: {"Content-Type": "application/json", "Accept": "application/json", "Authorization": code}, body: JSON.stringify(updatedMenu)})
        .then(response => {
            console.log(response)
            editBox.innerHTML = ''
            menu.innerHTML = ''
        })
        .catch(console.log)
}



