const usersNumber = document.getElementById("number-of-users")
const usersTable = document.getElementById("users-table-body")

const allRows = document.querySelectorAll("tr")

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

const checkAdmin = localStorage.getItem("himbeadmin")

if (!checkAdmin) {
    
    location.href = "./index.html"
}



const allUsers = async () => {
    
    const response = await fetch(url+"/users/all", {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const data = await response.json()

    usersNumber.innerHTML = data.users.length

    usersTable.innerHTML = data.users.map((x,i)=>{

        return `
        
        <tr data-id=${x._id} data-index=${i} class="table-data">

        <td>${x.firstName}</td>
        <td>${x.country}</td>
        <td>${x.email}</td>
        <td>${x.forAdmin}</td>
        <td><button data-id=${x._id} onclick="manage(this)">Manage</button></td>

        </tr>
        
        
        
        
        
        `

    }).join("")

    console.log(data)

}



allUsers()


const manage = (button) => {
    
    const id = button.dataset.id

    location.href=`./user.html?id=${id}`

}


// allRows.forEach(row => {
    
//     row.addEventListener("click", () => {
        
//         location.href=`/super/admin/${row.dataset.id}`
//     })

// })