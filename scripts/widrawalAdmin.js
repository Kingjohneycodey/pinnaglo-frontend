const usersNumber = document.getElementById("number-of-users")
const usersTable = document.getElementById("users-table-body")

const allRows = document.querySelectorAll("tr")

const url = "https://pinn-algo-capitals.vercel.app/api/v1"


const checkAdmin = localStorage.getItem("admin")

// if (!checkAdmin) {
    
//     location.href = "./index.html"
// }

const token = localStorage.getItem("token")


const allWIthdrawals = async () => {
    
    const response = await fetch(url+"/withdrawals?status=pending"
    , {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${token}`
        }
    })

    const data = await response.json()
    console.log(data)

    usersNumber.innerHTML = data.doc.length

    usersTable.innerHTML = data.doc.map((x,i)=>{

        return `
        
        <tr data-id=${x._id} data-index=${i} class="table-data">

        <td>${x.user.firstName} ${x.user.lastName}</td>
        <td> $${x.amount}</td>
        <td>${x.walletAddress}</td>
        <td>${x.status === "pending" ? "<button>Manage</button>" : "Approved"}</td>

        </tr>
        
        
        
        
        
        `

    }).join("")

    console.log(data)

}



allWIthdrawals()


const manage = (button) => {
    
    const id = button.dataset.id

    location.href=`./user.html?id=${id}`

}


// allRows.forEach(row => {
    
//     row.addEventListener("click", () => {
        
//         location.href=`/super/admin/${row.dataset.id}`
//     })

// })