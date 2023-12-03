const usersNumber = document.getElementById("number-of-users")
const usersTable = document.getElementById("users-table-body")

const allRows = document.querySelectorAll("tr")

const url = "https://pinn-algo-capitals.vercel.app/api/v1"

let requests = []

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
    
            // TODO: Implement the logic for the "Approve" button
            const approveButton = document.getElementById('approveButton');
            approveButton.addEventListener('click', () => {
                // Implement the logic to approve the request
                // You can call a function or perform any necessary actions
                alert('Request Approved!');
            });
    
            // TODO: Implement the logic for the "Decline" button
            const declineButton = document.getElementById('declineButton');
            declineButton.addEventListener('click', () => {
                // Implement the logic to decline the request
                // You can call a function or perform any necessary actions
                alert('Request Declined!');
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