function flatObject(obj = {}) {
    const {name , age ,address,details} = obj
   const {city , state} = address
   const {contact , personal} = details
   const {mobileNumber} = contact
   const {gender} = personal

    return {
        name : name,
        age : age,
        city : city,
        state : state,
        mobileNumber: mobileNumber,
        gender : gender
    }
}

const result = flatObject({
  name: "Rohan",

  age: 30,

  address: {
    city: "mumbai",

    state: "Maharashtra",
  },

  details: {
    contact: {
      mobileNumber: "1234567890",
    },

    personal: {
      gender: "m",
    },
  },
});

console.log(result); // { name: "rohan", age: 30, city: "mumbai", state: "Maharashtra",    mobileNumber: "1234567890",   gender: "m"}
