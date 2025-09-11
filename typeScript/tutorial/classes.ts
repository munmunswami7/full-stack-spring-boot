class Person {
    private firstName: string;
    private age: number;

    constructor(firstName:string, age:number){
        this.firstName = firstName;
        this.age = age
    }

    printName() {
        console.log(`Your name is ${this.firstName} and you are ${this.age} years old`);
    }
}

const junior =new Person('Jack Smith', 34)
junior.printName()


//SHORTHAND WAY OF DEFINING A CLASS
class Human{

    constructor(private name:string, private age: number){

    }
    printName() {
        console.log(`Your name is ${this.name} and you are ${this.age} years old`);
    }
}

const senior = new  Human('Jim', 90)
console.log(senior);

class superSenior extends Human{}
const supersenior1 = new superSenior('Smith',45)
console.log(supersenior1);

class megaSenior extends Human{
    constructor(name:string, age:number, private ssn:string){
        super(name, age)
    }
}

//longHand way of defining the class
// class megaSenior extends Human{
//     private ssn:string;

//     constructor(name:string, age:number){
//         super(name, age)
//         this.ssn = ssn
//     }
// }

const jane = new megaSenior('jane',23,'bhjg57687')
console.log(jane);


class Car {
    static MAX_NUMBER_OF_WHEELS = 6

    constructor(private make: string, private model: string){
    }

    set carMakeSet(value:string){
        this.make = value
    }

    get carMakeGet(){
        return this.make
    }

    //properties like getters and setters are not accessiblr using this keyword in methods that are static
    // we can use this keyword to access static properties inside static methods
    static carStats(mile: number){
        console.log(this.MAX_NUMBER_OF_WHEELS);
        
        return {milage: mile, type:'Hybrid'}
    }
}

const acura = new Car('Acura','TL')
console.log(acura.carMakeGet);

acura.carMakeSet='Hoz'
console.log(acura);
console.log(Car.MAX_NUMBER_OF_WHEELS);
console.log(Car.carStats(90));


abstract class Animal{
    constructor(private name:string){}
    abstract printSound(sound:string):void
}

class Dog extends Animal{
    printSound(sound: string): void {
        console.log(`${sound}....`);
    }
}

const blaki = new Dog ('Blaki')
console.log(blaki);
console.log(blaki.printSound('Bark'));



