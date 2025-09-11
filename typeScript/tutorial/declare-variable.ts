let company = "VishVaib Pte Ltd"
let isMale = true
let lottaryNumber =77
let person = {
    name: "Jack",
    location: "Indore"
}

console.log(company);
console.log(isMale);
console.log(lottaryNumber);
console.log(person.location);

let isFemale = true

if(isFemale){
    /**
     * this gender variable is available within the if block only
     * if var gender = 'female',
     * then its available outside the if block as well
     * */ 
    let gender = 'female'
}

// you cannot reassign value to const variable
const PI = 3.14
