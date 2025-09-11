interface Computer {
    name: string;
    ram: string;
    size: number;

    connect(adapter:string):void;
}


let latitude: Computer
latitude = {
    name: 'Latitude', 
    ram:'32GB',
    size: 15,

    connect(adapter):void {
        console.log(`Power on, connected to ${adapter}`);   
    }
}

interface HttpConnection {
    createConnection(url: string): void
}

class MakeConnection implements HttpConnection{

    constructor(private headers:string[], private body:string){}

    createConnection(url: string): void {
        console.log(`connection created to ${url}`);   
    }
}

interface Patient {
    name: string
}

interface Client extends Patient{
    rating: number
}

class tenant implements Client{
    name: string
    rating: number

    constructor( name: string, rating: number){
        this.name = name
        this.rating = rating
    }
}

//INTERFACE METHOD
interface Calculate {
    (num1: number, num2:number):number
}

let cal: Calculate

cal = (a:number, b: number) => {
    return a+b
}