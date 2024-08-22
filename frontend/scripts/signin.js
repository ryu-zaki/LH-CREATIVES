/* Sign in Functionality */
const signinForm = document.querySelector('form.signin');

/* user informations */
const requiredFields = document.querySelectorAll('[data-required-field]');

requiredFields.forEach(input => {
   input.addEventListener('input', () => {
      errMess.style.display = "none";
      signTitle.style.display = "block";
   })
})

/* Error Message Visibility */
const errMess = document.querySelector("[data-err-mess]");
const signTitle = document.querySelector("[data-signin-title]");


const loadingBtn = document.querySelector(".loading-btn");
let isLoading = false;

signinForm.addEventListener('submit', (e) => {
   e.preventDefault();
   
   if (isLoading) return;

   isLoading = true;
   const userInfoObj = {};
   requiredFields.forEach(input => {
       userInfoObj[input.id] = input.value;
   })
   
   loadingBtn.classList.add("loading");
   signInAccount(userInfoObj)
   .then((ok) => {
      if (!ok) {
         errMess.style.display = "flex";
         signTitle.style.display = "none";
         return;
      }

      window.location.href = '/dashboard';
   })
   .finally(() => {
      isLoading = false;
      loadingBtn.classList.remove("loading");
   })

  
})

const signInAccount = async (data) => {
   try {
     const respond = await fetch('/signin', {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      
     })

     return respond.ok
     
     
   }

   catch(err) {
      console.log(err);
      return err;
   }
}