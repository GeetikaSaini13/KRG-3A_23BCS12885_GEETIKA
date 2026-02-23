import {username,getusername} from "./math"
test("valid username",()=>{
    expect(username(null)).toBe("null");
    expect(username("Geetika")).toBe("Geetika");
});

test("username",()=>{
    expect(getusername("Nisha")).toBe("Nisha");
    expect(getusername(null)).toBe("Guest")
})