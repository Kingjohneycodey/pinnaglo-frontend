 

const userReferralsTable = document.getElementById("user-referrals-table-body")

const getUserReferrals = async () => {
    
    const response = await fetch(url+"/referrals/my-referrals", {
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

    userReferralsTable.innerHTML = data.doc.map((x, index) => {

         
        return `
        <tr class="table-data">
        <td>${index+1}</td>
        <td>${x.downline.firstName}</td>
        <td>${x.downline.lastName}</td>
        <td>${x.downline.email}</td>
        <td>${x.downline.subscription == null ? 'inactive' : x.downline.status}</td>
        </tr>
        
        
        `
        

    }).join("")

    }



}

getUserReferrals()