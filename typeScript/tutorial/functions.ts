function add (num1:number, num2:number): number {
    return num1 + num2
}

console.log(add(9,78));

let multiply = (a:number, b:number) => a*b
console.log(multiply(8,9));

function formatName(firstName: string, lastName?:string): string{ //? means variable is optional
    return `${firstName} ${lastName}`
}
 console.log(formatName('Jack', 'Smith'));
 console.log(formatName('jones'));


 //the rest parameter is always going to be some Array type,
 // Type[], Array<Type>. the default is any[], Array<any>

 function printNames(firstName:string, ...allOther:string[]):string {
    return firstName + " " +allOther.join(',')
 }

 console.log(printNames('test1','test2','test3', 'test4'));
 
//FUNCTION OVERLOADING  

//OVERLOAD SIGNATURE
function addValues(num3:number, num4:number):number
function addValues(num3:string, num4:string):string

 //SINGLE IMPLEMENTATION
function addValues(a:any, b:any):any{
    return a+b
}

console.log(addValues(4,5));
console.log(addValues('will','smith'));



