const person = {
  name: 'Joe',
  age: 25,
  location: {
    city: 'London',
    temp: 1
  }
};

// default in destructuring
const { name = 'Anonymous', age } = person

console.log(`${name} is ${age}.`)

// Rename in destructure
const { city: myCity, temp: temperature } = person.location;

if (myCity && temperature) {
  console.log(`It's ${temperature} in ${myCity}.`);
}

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
};

const { name: publisherName = 'Self-Published' } = book.publisher;

console.log(publisherName);


// Array destructuring

const address = ['35a Goldhawk Road', 'London', 'United Kingdom', 'W12 8QQ'];

// Skips the first and last
const [, city, country = 'Not Sure'] = address;

console.log(`You are in ${city}, ${country}.`);


const item = ['Coffee (hot)', '£2.00', '£2.50', '£2.50'];

const [itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);
