
class Auth{
    constructor(){
        this.authenticated =false;
        // const token = localStorage.getItem('token');
        // if(token){
        //     this.authenticated = true;
        // }else{
        //     this.authenticated = false;
        // }      
    }

    login(cb){
        this.authenticated = true;
        cb();
    }

    logout(cb){
        this.authenticated = false;
        cb();
    }

    isAuthenticatedAdmin(){
        const token = localStorage.getItem("token");
        const Email = localStorage.getItem("Email");
        const Type = localStorage.getItem("Type");

        if(Type==="false") return true;
        return false;
        //return this.authenticated;
    }
 
    isAuthenticatedUser(){
        const token = localStorage.getItem("token");
        const Email = localStorage.getItem("Email");
        const Type = localStorage.getItem("Type");

        if( Type==="true" ) return true;
        return false;
        //return this.authenticated;
    }

}

//console.log(this.authenticated);
export default new Auth();