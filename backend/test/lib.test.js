const lib = require("../models/lib");

describe("fizzbuzz", ()=>{

  it("should return exception if input is not a number",()=>{
    expect(()=>{lib.fizzbuzz("a").toThrow()});
    expect(()=>{lib.fizzbuzz(null).toThrow()});
    expect(()=>{lib.fizzbuzz(undefined).toThrow()});
    expect(()=>{lib.fizzbuzz({}).toThrow()});
  })
  
  it("should return fizzbuzz if input divide 3 and 5.",()=>{
    const result = lib.fizzbuzz(15);
    expect(result).toBe("FizzBuzz");
  })
  it("should return fizzbuzz if input divise 3.",()=>{
    const result = lib.fizzbuzz(9);
    expect(result).toBe("Buzz");
  })
  it("should return fizzbuzz if input divise 5.",()=>{
    const result = lib.fizzbuzz(10);
    expect(result).toBe("Fizz");
  })
})

describe("abs", () => {
  it("should return positive if number is positive ", () => {
    const result = lib.abs(1);
    expect(result).toBe(1);
  });

  it("should return positive if number is negative ", () => {
    const result = lib.abs(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if number is 0 ", () => {
    const result = lib.abs(0);
    expect(result).toBe(0);
  });
});

describe("greeting", () => {
  it("should return greeting msg", () => {
    const result = lib.greet("Tom");
    expect(result).toMatch(/welcome Mr: Tom/);
  });
});
