const usersNumber = document.getElementById("number-of-users")
const usersTable = document.getElementById("users-table-body")

const allRows = document.querySelectorAll("tr")

const url = "https://pinn-algo-capitals.vercel.app/api/v1"

let requests = []

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


const token = localStorage.getItem("admin")


// function refreshToken() {
//     const token = localStorage.getItem('token');
  
//     if (!token) {
//       // If token doesn't exist in local storage, consider it expired
//       return true;
//     }
  
//     try {
//       const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decoding the payload of the token
  
//       // Check if the token has an 'exp' (expiration) claim
//       if (tokenPayload && tokenPayload.exp) {
//         const tokenExp = new Date(tokenPayload.exp)
//         console.log(tokenExp)
//         const expirationTime = tokenPayload.exp * 1000; 
//         console.log(new Date(expirationTime))// Convert expiration time to milliseconds
        
//         const currentTime = Math.floor(Date.now() / 1000);

//         console.log(currentTime)

//         // Compare the expiration time with the current time
//         Date.now() >= expirationTime;

//         tokenPayload.exp = currentTime + 3600;
        
//         console.log(new Date(tokenPayload.exp * 1000))

//         // localStorage.setItem('token', JSON.stringify(tokenPayload));

//       }
//     } catch (error) {
//       console.error('Error parsing token:', error);
//     }

//   };

//   refreshToken()

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

    requests = data.doc

    usersTable.innerHTML = data.doc.map((x,i)=>{

        return `
        
        <tr data-id=${x._id} data-index=${i} class="table-data">

        <td>${x.user.firstName} ${x.user.lastName}</td>
        <td> $${x.amount}</td>
        <td>${x.walletAddress}</td>
        <td>${x.status === "pending" ? "<button  id='mange-width'>Manage</button>" : "Approved"}</td>

        </tr>
        
        
        
        
        
        `

    }).join("")


    document.querySelectorAll("#mange-width").forEach(button => {
        button.addEventListener("click", () => {
            const parentElement = button.parentElement;
            const mainParent = parentElement.parentElement;
            const index = parseInt(mainParent.dataset.index);
            const currentRequest = requests[index];
    
            const walletAddress = currentRequest.walletAddress;
            const amount = currentRequest.amount;
    
            // Update modal content
            document.getElementById('modalAmount').innerText = `Amount: ${amount}`;
            document.getElementById('modalWalletAddress').innerText = `Wallet Address: ${walletAddress}`;
    
            // Display the modal
            const modal = document.getElementById('myModal');
            modal.style.display = 'block';
    
            // Close the modal when the 'x' button is clicked
            const closeBtn = document.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
    
            // TODO: Implement the logic to copy the wallet address when the button is clicked
            const copyButton = document.getElementById('copyButton');
            copyButton.addEventListener('click', () => {
                // Implement the copy to clipboard logic here
                // You can use document.execCommand('copy') or the Clipboard API
                // For simplicity, let's assume you have a function copyToClipboard(text)
                copyToClipboard(walletAddress);
                alert('Wallet address copied to clipboard!');
            });

           // Set the subid attribute for approve button
    // Set the subid attribute for decline button
    
            // TODO: Implement the logic for the "Approve" button
            const approveButton = document.getElementById('approveButton');
            approveButton.dataset.subid = currentRequest._id; 
            approveButton.addEventListener('click', () => {
                const id = approveButton.dataset.subid // Get subid attribute value
                // Perform operations using the obtained id
                console.log("Transaction approved for ID:", id);
                // closeModal();
            
                fetch(`${url}/withdrawals/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type":"application/json",
                        "authorization": `Bearer ${checkAdmin}`
                    },
                    body: JSON.stringify({ status: "approved" })
                })
                    .then(response => {
                        modal.style.display = 'none';
                        alert('Withdrawal Request Approved')
                        allWIthdrawals()
                        return response.json()
                    })
                    .catch(error =>{
                        console.log(error)
                        alert("Error while approving user's withdrawal request")
                    } )
              
            });
    
            // TODO: Implement the logic for the "Decline" button
            const declineButton = document.getElementById('declineButton');
            declineButton.dataset.subid = currentRequest._id; 
            declineButton.addEventListener('click', () => {
                const id = declineButton.dataset.subid // Get subid attribute value
                // Perform operations using the obtained id
                console.log("Transaction approved for ID:", id);
                // closeModal();
            
                fetch(`${url}/withdrawals/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type":"application/json",
                        "authorization": `Bearer ${checkAdmin}`
                    },
                    body: JSON.stringify({ status: "rejected" })
                })
                    .then(response => {
                        modal.style.display = 'none';
                        alert('Withdrawal Request Declined')
                        allWIthdrawals()
                        return response.json()
                    })
                    .catch(error =>{
                        console.log(error)
                        alert("Error while declining user's withdrawal request")
                    } )
            });
        });
    });
    
    // Helper function to copy 
    
    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }
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