const usersNumber = document.getElementById("number-of-users")
const usersTable = document.getElementById("users-table-body")

const allRows = document.querySelectorAll("tr")

const url = "https://pinn-algo-capitals.vercel.app/api/v1"


const checkAdmin = localStorage.getItem("admin")

// if (!checkAdmin) {
    
//     location.href = "./index.html"
// }



const allUsers = async () => {
    
    const response = await fetch(url+"/users", {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${checkAdmin}`
        }
    })

    const data = await response.json()
    console.log(data)

    usersNumber.innerHTML = data.doc.length

    usersTable.innerHTML = data.doc.map((x,i)=>{

        return `
        
        <tr data-id=${x._id} data-index=${i} class="table-data">

        <td>${x.firstName}</td>
        <td> ${x.lastName}</td>
        <td>${x.email}</td>
        <td>${x.wallet}</td>
        <td>${x.status}</td>

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