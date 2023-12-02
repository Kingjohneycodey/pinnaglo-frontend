const mobileMenuButton = document.getElementById('menubar');
const menuList = document.getElementById('mobile-menu-list')
const body = document.getElementsByTagName('body')

mobileMenuButton.addEventListener('click', () => {
    menuList.classList.toggle("active")
})
menuList.addEventListener('click', () => {
    menuList.classList.remove("active")
})
// document.addEventListener('click', () => {
//     menuList.classList.remove("active")
// })


                const url = "https://nexuscrypto.onrender.com"
                    

                const startServer = async ()=>{

                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type":"application/json"
                        }
                  })
                }

                startServer()

                         

                   