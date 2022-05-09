// calling this behavior because JS controls the behavior of the website


//Game behavior for recoveryVR "simulation" is in the recoveryVRbahavior.js file


// Populating sign in fields
// Creating array of objects
//var information = [{'name':'Allexa Ortiz', 'email': 'aortiz21@students.kgi.edu', 'age': '23', 'condition': 'Gastric  Bypass', 'username':'aortiz', 'password':'crackers' },
  //                 {'name':'Sophia Sy', 'email': 'ssy21@students.kgi.edu', 'age': '22', 'condition': 'Traumatic Brain Injury', 'username':'ssy', 'password':'cookies'},
    //                ];


//sign in cookies
$('submit-input').click(function () {
    //Set sign in/sign up inputs
    var eaddress = $('#eaddress-input').val();
    var password = $('#password-input').val();
})

//Create sign-in cookie
    Cookies.set('eaddress', eaddress);
    Cookies.set('password', password);


// COOKIES
//When a user save profile the profile builder form
$('save-input').click(function () { 
    // Set profile info from inputs
    var fullName = $('#fullName-input').val();
    var age = $('#age-input').val();
    var email = $('#email-input').val();
    var condition = $('#condition-input').val();
    var zipcode = $('#zipcode-input').val();
    //We have a zipcode input, but no field in the profile builder form- ALLEXA


//Create profile cookie
    Cookies.set('fullName', fullName);
    Cookies.set('age', age);
    Cookies.set('email', email);
    Cookies.set('condition', condition);
    Cookies.set('zipcode', zipcode);

//Reload page so cookie can take effect
    location.reload();
});

// If there is a cookie, show welcome message
var fullName = Cookies.get('fullName');
if (fullName) {
    //Hide new user input form
    $('#new-user-input').hide();
    //Show welcome message
    $('#welcome-text').text('Welcome,' + fullName);
}

/* THIS IS FOR THE SIGN-IN VALIDATION */
/* Code adapted from: https://www.youtube.com/watch?v=PkxA6m-NNCY */
function validate()
{
    var eaddress=document.getElementById("eaddress").value;
    var password=document.getElementById("password").value;
    if (eaddress=="aortiz21@students.kgi.edu" && password=="orange")

    {
        alert("Login Succesful!");
        return false;

    }
    else
    {
        alert("Login Failed! Please try again.");
    
    }

}