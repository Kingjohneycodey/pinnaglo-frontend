

const depositTable = document.getElementById("deposite-table-body")
const withdrawalTable = document.getElementById("withdraw-table-body")



const getUserTransactins = async () => {
    
    const response = await fetch(url+"/subscriptions/my-subscriptions", {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Bearer ${token}`
        }
    })

    const data = await response.json()
    console.log(data)


    if(data.status === "success"){
        const user = data.downline

    depositTable.innerHTML = data.doc.map(x => {

        // const user = x.downline

        var date = new Date(x.createdAt).toLocaleDateString("en-GB", {
            year: "2-digit",
            month: "2-digit",
            day:"2-digit"
        }).split("/").join("-")

        var enddate = new Date(x.expiration).toLocaleDateString("en-GB", {
            year: "2-digit",
            month: "2-digit",
            day:"2-digit"
        }).split("/").join("-")

        if(x.status == 'pending'){
            date = 'pending'
            enddate = 'pending'
        }

        if(x.status == 'rejected'){
            date = 'inactive'
            enddate = 'inactive'
        }
         
        return `
        <tr class="table-data">
        <td>${x.duration}</td>
        <td>$${x.accountSize}</td>
        <td>${x.status}</td>
        <td>${date}</td>
        <td>${enddate}</td>
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
        
        withdrawalTable.innerHTML = data.doc.map(x => {
            
             const date = new Date(x.createdAt).toLocaleDateString("en-GB", {
            year: "2-digit",
            month: "2-digit",
            day:"2-digit"
             }).split("/").join("-")
            

            return `
            
            <tr>

            <td>$${x.amount}</td>
                                   
                                    <td>${x.status}</td>
                                    <td>${date}</td>

            </tr>
            
            `


        }).join("")
    }

    


}

getUserWithdrawal()

getUserTransactins()