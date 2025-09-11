function updateUser<T, V>(oldUser:T, newUser:V): T & V{
    return {...oldUser, ...newUser}
}

function makeUser<T>(user:T):T {
    return {...user, admin:true}
}

let user1 = {name:'Junior'}
let user2 = {age:89, genger:'Male'}

console.log(updateUser(user1,user2));
console.log(makeUser(user1));

class Planet<T> {
    private closestStar: T

    constructor(closesetStar:T){
        this.closestStar=closesetStar
    }
}

interface UserData {
    size: number,
    data: string[]
}

const planetZ = new Planet<UserData>({data:['Xorox', 'Xerox'], size:89})