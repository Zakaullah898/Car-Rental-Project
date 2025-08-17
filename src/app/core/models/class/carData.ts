export class carData{
    name : string;
    rentPrice:string;
    image : string;
    showLike!:boolean;
    tankCapacity :number;
    transmission :number;
    sittingCapacity :number;
    constructor(){
        this.name = '';
        this.image = '';
        this.rentPrice = '';
        this.showLike = false;
        this.tankCapacity = 0;
        this.transmission = 0;
        this.sittingCapacity = 0;
    }

}