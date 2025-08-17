export class rentCarCard{
    carName:string; 
    pkr :string; 
    carImg: string;
     showLike ?: boolean;

     constructor (){
        this.carName ='';
        this.carImg = '';
        this.pkr = '';
     }
}

export class loginApi{
   name: string;
   userEmail: string;
   password: string;
   phoneNumber: string;
 
   constructor(){
      this.name = '';
      this.userEmail= '';
      this.password='';
      this.phoneNumber = '';
   }
}