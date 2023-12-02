  form.addEventListener('submit', async (e) => {
            e.preventDefault()
            emailError.style.display='none'
            passwordError.style.display='none'
            if(email.value == ''){
                emailError.style.display='block'
            } if( password.value == ''){
                passwordError.style.display='block'
            } else{
                button.innerHTML='Loading...'
                button.ariaDisabled=true
          
//         .catch((error) => {
//     button.innerHTML='Login'
//     button.ariaDisabled=true
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     Error.innerHTML = error.message
//     Error.style.display='block'
//     console.log(error)
//     // alert(error.message)
//   });
    }

    
  })
  