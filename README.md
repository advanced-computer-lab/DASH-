# Project Title: DASH- Airline Reservation System Project 
the main purpose of this project is to simulate what a flights reservation system does and the difference between the options does the user,guest or the administrator has acess to.for example, the admin had the ability to add,delete or edit flights from the database. the guest can search through the flights available and the user can book them as well as edit their booked flights or cancel them 


# Motivation
the purpose behind this project was implementing a user-friendly website using the MERN stack, alot of skills were gained during this project but the most important ones are:
-using git
-node.js
-react
-designing of a website
-mongo db
-rest APIs
-design pattern MVC


# Build Status
the search functionality, the one inside edit and my tickets does not fully work, so as an alternative, the user can search using the search button directly and book from there.



# Code Style
In this project, mainly standard code style was used.


# Screenshots
![GitHub Logo](https://drive.google.com/file/d/1rPoVLs3NcYjd-OXi8l2gmSJZcx_whaoe/view?usp=sharing) Format: ![Alt Text](url) 

![GitHub Logo](https://drive.google.com/file/d/1qgnewzTcxm27R6mOpCHOSrXhsjYoTyGK/view?usp=sharing) Format: ![Alt Text](url) 

![GitHub Logo](https://drive.google.com/file/d/1qu0PpZu4EqjjVCpqOz4spJDrrumxY_k1/view?usp=sharing) Format: ![Alt Text](url) 

![GitHub Logo](https://drive.google.com/file/d/1w22L8Yf8m5ub9gfpBPE4ldzlhitDjr-C/view?usp=sharing) Format: ![Alt Text](url) 

![GitHub Logo](https://drive.google.com/file/d/1QZ6KX-64_zq1RIcS_qe39WutyCgSNyVK/view) Format: ![Alt Text](url) 



# Tech/Framework used:
In this project the MVC Design Pattern is used to organize the code and the MERN stack is used to build this project in addition to bootstrap/popper and react bootstrap for styling



# Features
Our website stands out because of it being user friendly and easy to use, it was designed to guide the user through the correct steps to be done in order to reach to the final step which is paying or reserving the desired flight,the UI and the UX are comforting for the user.


# Code Examples
userRouter.get('/isAuth',auth , (req,res)=>{  
})
userRouter.post('/EditUser',auth, userController.EditUser);
userRouter.post('/FindEmail' , userController.findUser);
userRouter.post('/FindUsername', userController.findUserName);
userRouter.post('/FindInfo',auth, userController.findUserInfo);
userRouter.post('/SendEmail', auth ,userController.SendEmail)
userRouter.post('/SendEmailDetails', auth , userController.SendEmailDetails)
userRouter.post('/SendEmailPay', auth , userController.SendEmailPay)

exports.EditUser = (req, res) => {
    var attrib = { FirstName: req.body.FirstName, Username: req.body.Username, Address: req.body.Address, Telephone: req.body.Telephone, CountryCode: req.body.CountryCode, LastName: req.body.LastName, Email: req.body.Email, Passportnumber: req.body.Passportnumber };



    User.findOne({ Email: req.user.UserMail }, (err, docs) => {

        if (attrib.FirstName.length != 0)
            docs["FirstName"] = attrib.FirstName

        if (attrib.LastName.length != 0)
            docs["LastName"] = attrib.LastName

        if (attrib.Email.length != 0)
            docs["Email"] = attrib.Email

        if (attrib.Username.length != 0)
            docs["Username"] = attrib.Username

        if (attrib.Address.length != 0)
            docs["Address"] = attrib.Address

        if (attrib.Telephone.length != 0)
            docs["Telephone"] = attrib.Telephone

        if (attrib.CountryCode.length != 0)
            docs["CountryCode"] = attrib.CountryCode

        if (attrib.Passportnumber.length != 0)
            docs["Passportnumber"] = attrib.Passportnumber

        docs.save();

    })

}


# Installation :
1-Clone the repository from GITHUB
2- Open the project in visual studio code (preferred)
3- Open 2 terminals to run the backend and frond end at the same time (A must) (or you can use the command line promot instead VScode terminals)
4- In the first terminal type the commands to run backend :
        cd src
        node App.js
5- In the second terminal type the commands below to run frondEnd:
        cd src
        npm start
        

# API reference
https://docs.github.com/en/rest
https://nodejs.org/en/docs/




# Tests
For the admin:
The listing of the flights on the system 
Searching mechanism and the criteria is okay
Editing the flights
Adding/Deleting a flight
    
For the guest:
signUp
listing flights
searching for flights

For the User:
guest's functions + 
booking flights 
cancelling flights
editing already booked flights
paying for flights

code example for testing:
if(admin adds flight to db){
        find flight in flight list
}
else{
        error adding flight in db
}

if(user books flight){
        find flight in my ticktes
}
else{
        error adding flight in my flights
}

if(user books flight){
        decrement available seats in this flight
}
else{
        error booking flight
}


# How to Use?
- the user has an option either to sign up or to continue as a guest,
if you are looking to book a flight I advise you to sign up :)
-if you continue as a guest you will be able to list the flights by clicking the flight list button
-use the search button to search
-to sign up, use the login button then sign up as a new user
-as a user now, you are able to login with your created password 
-after signing in, you will be redirected to your home, where you can view your info and edit them using edit my info button and change your password using the change password button.
-view my booked flights, using the my flights button where you will be provided with all the details of the booked flights you have on your account as well as the option to edit, cancel or email yourself with the details of them.
-book a new flight using the search button after selecting your desired flight and press pay to add the details of your credit card, after that, you're all set :).

As an admin:
- you will have acess to add, edit or delete any flight using the provided buttons in the admin interface.


# Contribute
Any contribution to alter or add to the project is more then welcome, all you have to do is ask for permission to the repository on github on the link https://github.com/advanced-computer-lab/DASH-


# Credits
https://react-bootstrap.github.io/
https://mui.com/
https://www.codecademy.com/learn/react-101
https://www.w3schools.com/nodejs/
https://expressjs.com/