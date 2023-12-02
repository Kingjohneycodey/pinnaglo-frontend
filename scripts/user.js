
const urlparams = new URLSearchParams(location.search)


const id = urlparams.get("id")

const activitiesSection = document.getElementById("user-activity-container")
const addProfitBox = document.getElementById("profit-container")
const depositTable = document.getElementById("deposite-table-body")
const user = document.getElementById("username")
const passwordContainer = document.getElementById("password-container")
const loginContainer = document.getElementById("login-btn")
let token = ""
const withdrawalTable = document.getElementById("withdrawal-table-body")
let userEmail = ""

const url = "https://nexuscrypto.onrender.com"

const checkAdmin = localStorage.getItem("himbeadmin")

if (!checkAdmin) {
    
    location.href = "./index.html"
}



const getActivities = async () => {
    
    const response = await fetch(url+"/users/activities?id="+id, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const data = await response.json()

    console.log(data)

    token = data.user.token
    userEmail = data.user.email

    console.log(token)

    if (data.status) {
        
        activitiesSection.style.display = "block"
        addProfitBox.style.display = "block"
        passwordContainer.style.display = "block"
        loginContainer.style.display = "block"
        withdrawalTable.style.display = "block"


            
            user.innerHTML = "User"
      

        
        

        depositTable.innerHTML = data.transactions.map(x => {
            

            return `
            
        <tr data-id=${x._id}
         class="table-data">

        <td>${x.amount}</td>
        <td>Bitcoin</td>
        <td>${x.status}</td>
        <td>20-09-23</td>
        <td> ${x.status === "pending" ? `<button data-id=${x._id} onclick='approveTransaction(this)'>Approve</button>` : "Approved"}</td>

        </tr>
        
            
            
            
            `

        }).join("")
        withdrawalTable.innerHTML = data.withdrawals.map(x => {
            

            return `
            
        <tr data-id=${x._id}
         class="table-data">

        <td>${x.amount}</td>
        <td>Bitcoin</td>
        <td>${x.status}</td>
        <td>20-09-23</td>
        <td> ${x.status === "pending" ? `<button data-id=${x._id} onclick='approveWithdrawal(this)'>Approve</button>` : "Approved"}</td>

        </tr>
        
            
            
            
            `

        }).join("")




    }

}


getActivities()


const addDeposit = async () => {

    const depositInput = document.getElementById("add-deposite-amount")
    

    const response = await fetch(url+"/users/deposit/add?id=" + id, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            amount:depositInput.value
        })
    })

    

    const data = await response.json()

    alert(data.message)


    if(data.status){

        location.reload()

    }

}
const removeDeposit = async () => {

    const depositInput = document.getElementById("add-deposite-amount")
    

    const response = await fetch(url+"/users/deposit/remove?id=" + id, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            amount:depositInput.value
        })
    })

    

    const data = await response.json()

    alert(data.message)


    if(data.status){

        location.reload()

    }

}
const addProfit = async () => {

    const depositInput = document.getElementById("add-profit-amount")
    

    const response = await fetch(url+"/users/profit/add?id=" + id, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            amount:depositInput.value
        })
    })

    

    const data = await response.json()

    alert(data.message)


    if(data.status){

        location.reload()

    }

}
const removeProfit = async () => {

    const depositInput = document.getElementById("add-profit-amount")
    

    const response = await fetch(url+"/users/profit/remove?id=" + id, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            amount:depositInput.value
        })
    })

    

    const data = await response.json()

    alert(data.message)


    if(data.status){

        location.reload()

    }

}

const resetPassword = async () => {
    
    const depositInput = document.getElementById("change-password-input")
    

    const response = await fetch(url+"/users/password/reset/admin?id=" + id, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            password:depositInput.value
        })
    })

    

    const data = await response.json()

    console.log(data)

    alert(data.message)


    if(data.status){

        location.reload()

    }


}


const loginAsUser = async ()=>{

          const expirationDate = new Date();

        expirationDate.setDate(expirationDate.getDate() + 60);

        const expires = `expires=${expirationDate.toUTCString()}`

        document.cookie=`jwt=${token};${expires}; path=/`

    localStorage.setItem("token",token)

        location.href = "./dashboard.html"

}

const approveTransaction = async (button) => {
    
    const id = button.dataset.id

  const response = await fetch(url+"/users/transaction/approve?id="+id, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const data = await response.json()

    console.log(data)

    alert(data.message)

    // "/users/transaction/approve"


}
const approveWithdrawal = async (button) => {
    
    const id = button.dataset.id

  const response = await fetch(url+"/users/withdrawal/approve?id="+id, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const data = await response.json()

    console.log(data)

    alert(data.message)

    // "/users/transaction/approve"


}

const sendUserEmail = () => {

    location.href = `./email.html?email=${userEmail}`

}