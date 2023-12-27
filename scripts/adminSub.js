const usersNumber = document.getElementById("number-of-users")
const usersTable = document.getElementById("users-table-body")

const allRows = document.querySelectorAll("tr")

const url = "https://pinn-algo-capitals.vercel.app/api/v1"


const checkAdmin = localStorage.getItem("admin")

if (!checkAdmin) {
    
    location.href = "./index.html"
}

function refreshToken() {
    const token = localStorage.getItem('admin');
  
    if (!token) {
      // If token doesn't exist in local storage, consider it expired
      return true;
    }
  
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decoding the payload of the token
  
      // Check if the token has an 'exp' (expiration) claim
      if (tokenPayload && tokenPayload.exp) {
        const expirationTime = tokenPayload.exp * 1000; // Convert expiration time to milliseconds
        
        const currentTime = Math.floor(Date.now() / 1000);

        // Compare the expiration time with the current time
        if(Date.now() >= expirationTime){
          alert('token expired')
          localStorage.clear()
          location.href = './Login Page/adminsect.html'
        }

        


      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }

  };

  refreshToken()


let subs = []



const allWIthdrawals = async () => {
    
    const response = await fetch(url+"/subscriptions"
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
        <td> $${x.amount}</td>
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
    const image = currentSub.attachments[0];
    const hash = currentSub.transaction_hash;
    const amount = currentSub.amount;
    const status = currentSub.status;
    const server = currentSub?.server ? currentSub?.server : "Not Submited Yet";
    const password = currentSub?.password ? currentSub?.password : "Not Submited Yet";
    const login = currentSub?.mt4Login ? currentSub?.mt4Login : "Not Submited Yet";

    // Update modal content
    document.getElementById("modalHash").textContent = hash;
    document.getElementById("modalAmount").textContent = amount;
    document.getElementById("modalStatus").textContent = status;
    document.getElementById("mtlogin").textContent = login;
    document.getElementById("mtpassword").textContent = password;
    document.getElementById("mtserver").textContent = server;
    document.getElementById("modalImage").src = image;

    // Display modal
    document.getElementById("myModal").style.display = "block";
    const approveButton = document.getElementById("myModal").querySelector("#approve");
    const declineButton = document.getElementById("myModal").querySelector("#decline");
    approveButton.dataset.subid = currentSub._id; // Set the subid attribute for approve button
    declineButton.dataset.subid = currentSub._id; // Set the subid attribute for decline button
}

const closeModal = () => {
    // Hide modal
    document.getElementById("myModal").style.display = "none";
}

const approveTransaction = async (button) => {
    const id = button.dataset.subid; // Get subid attribute value
    // Perform operations using the obtained id
    console.log("Transaction approved for ID:", id);
    // closeModal();

    fetch(`${url}/subscriptions/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${checkAdmin}`
        },
        body: JSON.stringify({ status: "approved" })
    })
        .then(response => {
            closeModal();
            alert('Subscription has been approved')
            allWIthdrawals()
            return response.json()
        })
        .catch(error =>{
            console.log(error)
        } )
}

const declineTransaction = async (button) => {
    const id = button.dataset.subid; // Get subid attribute value
    // Perform operations using the obtained id
    console.log("Transaction approved for ID:", id);
    // closeModal();

    fetch(`${url}/subscriptions/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${checkAdmin}`
        },
        body: JSON.stringify({ status: "rejected" })
    })
        .then(response => {
            closeModal();
            alert('Subscription has been rejected')
            allWIthdrawals()
            return response.json()
        })
        .catch(error =>{
            console.log(error)
        } )
}



// allRows.forEach(row => {
    
//     row.addEventListener("click", () => {
        
//         location.href=`/super/admin/${row.dataset.id}`
//     })

// })

