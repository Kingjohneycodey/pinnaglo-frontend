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
        <td>${x.subscription == null ? 'not active' : x.status}</td>

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