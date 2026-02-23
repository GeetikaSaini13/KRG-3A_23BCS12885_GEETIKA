export function username(user){
    if(user===null)return "null";
    return user;
}
export function getusername(user){
    return user===null?"Guest":user;
}