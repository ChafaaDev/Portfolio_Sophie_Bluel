// import { generateWorks } from "./main.js";
// import { setEditMode } from "./main.js";
// const response = await fetch(" http://localhost:5678/api/works")
   
// const works = await response.json();

// const categories = await fetch ("http://localhost:5678/api/categories")

// const worksCategory = await categories.json();


// loginForm.addEventListener("submit", (event)=>{

// event.preventDefault();

//


// const submitBtn = document.getElementById("submitBtn");

// submitBtn.disabled = true;

// const apiUrl ="http://localhost:5678/api/users/login"
   
  
// fetch(apiUrl, {
   
//     method : "POST",
    
//     headers :{ "content-type" : "application/json"},
    
//     body : JSON.stringify({Email, passWord})
// })
// .then(response=>response.json())

// .then(data=>{
    
//     if(data.token){
       
//         localStorage.setItem('authToken', data.token);

//         window.location.href('/index.html')
        
//         console.log("login successful, received token : " , authToken)
    
//     }else{
       
//         console.error("there was something wrong ", data.message)
//     }
// })

// .catch(error=>{

//     submitBtn.disabled = false;
    
//     console.error('problem logging in', error );

   
// })

// })
async function loginAdmin() {
    
const loginForm = document.getElementById("loginForm"); 
    
loginForm.addEventListener("submit", async (event)=>{

    event.preventDefault();

    const emailinput = document.getElementById("email").value;

    const passwordinput = document.getElementById("password").value;
 
try{

    const apiUrl = ('http://localhost:5678/api/users/login');

    const loginCredentials = {email : emailinput , password : passwordinput};

    const response = await fetch(apiUrl, {

    method : 'POST',

    headers : {"content-type" : "application/json"},

    body : JSON.stringify(loginCredentials)
})

    if(!response.ok){throw new Error("Echec de connexion")}

        const data = await response.json();

        const authToken = data.token;

        localStorage.setItem("loggedIn", "true");

        localStorage.setItem("Token", authToken);
 


if(loginCredentials.email!=="sophie.bluel@test.tld"){

    document.getElementById("errorUsername").style.display = "block";
    
} 
    if (loginCredentials.password!=="S0phie"){

    document.getElementById("errorPassword").style.display = "block";
   
    } 
        else {
    
     window.location.href = "./index.html?editMode=true";

 
    }
 
}catch(error){
    
    alert(error.message)
}

})

const formFields = document.querySelectorAll("input");

formFields.forEach(field=>{
    
field.addEventListener("input", ()=>{
    
document.getElementById("errorUsername").style.display = "none";
    
document.getElementById("errorPassword").style.display = "none";

})
})

}
   loginAdmin();

