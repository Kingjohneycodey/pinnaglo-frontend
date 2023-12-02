

const depositTable = document.getElementById("deposite-table-body")
const withdrawalTable = document.getElementById("withdraw-table-body")



const getUserTransactins = async () => {
    
    const response = await fetch(url+"/referrals/my-referrals", {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${token}`
        }
    })

    const data = await response.json()
    console.log(data)


    // if(data.status)
    
    // depositTable.innerHTML = data.transactions.map(x => {

    //     const date = new Date(x.createdAt).toLocaleDateString("en-GB", {
    //         year: "2-digit",
    //         month: "2-digit",
    //         day:"2-digit"
    //     }).split("/").join("-")
        
    //     return `
    //     <tr class="table-data">
    //     <td>$${x.amount}</td>
    //     <td>${x.status}</td>
    //     <td>${date}</td>
    //     </tr>
        
        
    //     `

    // }).join("")

    if(data.status === "success"){
        const user = data.downline

    depositTable.innerHTML = data.doc.map(x => {

        const user = x.downline

        const date = new Date(user.createdAt).toLocaleDateString("en-GB", {
            year: "2-digit",
            month: "2-digit",
            day:"2-digit"
        }).split("/").join("-")
        
        return `
        <tr class="table-data">
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${date}</td>
        </tr>
        
        
        `

    }).join("")

    }



}


const getUserWithdrawal = async () => {
    
      const response = await fetch(url+"/withdrawals/my-withdrawals", {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${token}`
        
        }
    })

    const data = await response.json()
    console.log(data)
    if (withdrawalTable) {
        
        // withdrawalTable.innerHTML = data.requests.map(x => {
            
        //      const date = new Date(x.createdAt).toLocaleDateString("en-GB", {
        //     year: "2-digit",
        //     month: "2-digit",
        //     day:"2-digit"
        //      }).split("/").join("-")
            

        //     return `
            
        //     <tr>

        //     <td>$${x.amount}</td>
        //                             <td>Bitcoin</td>
        //                             <td>${x.status}</td>
        //                             <td>${date}</td>

        //     </tr>
            
        //     `


        // }).join("")
    }

    


}

getUserWithdrawal()

getUserTransactins()