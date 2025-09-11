//STRING - PRIMITIVE TYPE
function sayHello (name: string): void {
    console.log(`Hello ${name}`)
    
}

sayHello('Vishwa')

let myName: string = 'Junior';
console.log(myName);
console.log();

//NUMBER - PRIMITIVE TYPE
let age:number = 31
let decimalNumber:number
decimalNumber = 89.085
let change:number = 0.0089
console.log(age);
console.log(decimalNumber);
console.log(change);
console.log();


//BOOLEAN - PRIMITIVE TYPE

let isLoggedIn:boolean
isLoggedIn = true
let isAdmin = false
console.log(isLoggedIn, isAdmin);
console.log();

//ARRAYS

let names:string[] = []      // this initialisation is vetter then nect one
names.push('jack')
names.push('jill')
console.log(names);

let surname:Array<string> = []
surname.push('Jones')
surname.push('Mike')
console.log(surname);
console.log()

//OBJECT TYPE

let dog: {name:string, age:number, favPlaces: string[]}
dog = { name:'mike', age:14, favPlaces:['park', 'toilet'] }

console.log(dog);
console.log();

//ANY
let stuff:any
stuff = 'junior'
console.log(stuff);
stuff = 90
console.log(stuff);
stuff = true
console.log(stuff);
stuff = {name:'junior', age:78, hobbies:['reading', 'playing']}
console.log(stuff);
stuff = [1,2,3]
console.log(stuff);

console.log();

//UNION
let userID: number|string
userID =90
console.log(userID);
userID="ID5689"
console.log(userID);

let customer:(number|string)[] = []
customer.push(90)
customer.push('ninty')
console.log(customer);

console.log();

//ALIAS
type ID = number | string
let customerID: ID
customerID = 99
customerID = 'JKI99'

type Rectangle = {length:number, name: string}
let myRoom: Rectangle

myRoom  = {length:88, name:'roomName'}

//TUPLE TYPE - FIXED LENGTH ARRAY
let country: [name:string, area:number]
country = ['USA', 900]
console.log(country);

let modernCity : [area1: number, area2:number, name1: string]
modernCity = [8,12,'London']
console.log(modernCity);
console.log();

//ENUM
enum Role{
    ROLE_USER,
    ROLE_ADMIN,
    ROLE_SYSADMIN
}
let user: {name:string, role:Role}
user = {name:'jack', role:Role.ROLE_ADMIN}
console.log(user);

enum AppState {
    LOADING_STATE = 'loading_state',
    LOADED_STATE = 90,
    READY_STATE = 'ready_state'
}
let user1 : {mobileSet: string, applicationState: AppState}
user1 = {mobileSet: 'Samsung', applicationState: AppState.LOADING_STATE}
console.log(user1);
console.log();

//NEVER TYPE
let myFruit : never

function throwAnException(message: string) : never {
    throw new Error(message)
}

// throwAnException("Exception occured")

//UNKNOWN TYPE
let customerInput : unknown
customerInput = 10
customerInput = { age: 90}
customerInput = 'age_value'
console.log(customerInput);

let customerAge: string
customerAge = customerInput as string   //type assertion

if(typeof customerInput === 'string'){
    customerAge = customerInput
}


//LITERAL TYPE

let userType: 'USER' | 'ADMIN'

function saveUser(userID:number, type:'USER' | 'ADMIN'): void{
    if(type === 'USER')
        console.log(`role is ${type}`);
    else
        console.log(`role is ${type}`);
}

saveUser(90,'USER')







