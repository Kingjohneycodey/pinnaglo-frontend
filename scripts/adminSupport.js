const usersNumber = document.getElementById("number-of-users")
const usersTable = document.getElementById("users-table-body")

const allRows = document.querySelectorAll("tr")

const url = "https://pinn-algo-capitals.vercel.app/api/v1"


const checkAdmin = localStorage.getItem("admin")

if (!checkAdmin) {
    
    location.href = "./index.html"
}


let subs = []



const allWIthdrawals = async () => {
    
    const response = await fetch(url+"/tickets"
    , {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${checkAdmin}`
        }
    })

    const data = await response.json()
    console.log(data)

    usersNumber.innerHTML = data.doc.length

    subs = data.doc

    usersTable.innerHTML = data.doc.map((x,i)=>{

        return `
        
        <tr data-id=${x._id} data-index=${i} class="table-data">

        <td>${x.user.firstName} ${x.user.lastName}</td>
        <td> $${x.complaint.substring(0,10)+"..."}</td>
        <td>${x.status}</td>
        <td>${new Date(x.createdAt).toLocaleDateString()}</td>
        <td><button onclick="showModal(${i})">Manage</button></td>

        </tr>
        
        
        
        
        
        `

    }).join("")

}



allWIthdrawals()


const manage = (button) => {
    
    const id = button.dataset.id

    location.href=`./user.html?id=${id}`

}


// Add this JavaScript code
const showModal = (index) => {
    const currentSub = subs[index];
    // const image = currentSub.attachments[0];
    const complain = currentSub.complaint;
    const user = currentSub.user.firstName + " " + currentSub.user.lastName;
    const status = currentSub.status;

    // Update modal content
    document.getElementById("modalHash").textContent = complain;
    document.getElementById("modalAmount").textContent = user;
    document.getElementById("modalStatus").textContent = status;
    // document.getElementById("modalImage").src = image;

    // Display modal
    document.getElementById("myModal").querySelector("button").setAttribute("id", currentSub._id);
    document.getElementById("myModal").style.display = "block";
}

const closeModal = () => {
    // Hide modal
    document.getElementById("myModal").style.display = "none";
}

const approveTransaction = async (button) => {
    const id = button.getAttribute("id")


    const response = await fetch(url+"/tickets/"+id
    , {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${checkAdmin}`
        },
        body:JSON.stringify({status:"closed"})
    })

    const data = await response.json()
    console.log(data)

    if(data.status === "success"){
        alert("Complain Status Updated")
        closeModal();
    }
    // Add logic for approving the transaction
    console.log("Transaction approved");
    // closeModal();
}

const declineTransaction = () => {
    // Add logic for declining the transaction
    console.log("Transaction declined");
    closeModal();
}



// allRows.forEach(row => {
    
//     row.addEventListener("click", () => {
        
//         location.href=`/super/admin/${row.dataset.id}`
//     })

// })

