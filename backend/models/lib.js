module.exports.abs = (num) => (num >= 0 ? num : -num);
module.exports.greet = (name) => "welcome Mr: " + name + "!";
module.exports.fizzbuzz = (input)=>{
    if(typeof input !== "number")
        throw new Error("input not a number");
    if(input % 3 === 0 && input % 5 ===0 ) return "FizzBuzz"
    if(input % 3 === 0 ) return "Buzz"
    if( input % 5 ===0 ) return "Fizz"
}