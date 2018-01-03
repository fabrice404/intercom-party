# intercom-party
This project is my answer to the question asked for Intercom technical screener.
> We have some customer records in a text file (customers.json) -- one customer per line, JSON-encoded. We want to invite any customer within 100km of our Dublin office for some food and drinks on us. Write a program that will read the full list of customers and output the names and user ids of matching customers (within 100km), sorted by User ID (ascending).
 * You can use the first formula from [this Wikipedia article](https://en.wikipedia.org/wiki/Great-circle_distance) to calculate distance. Don't forget, you'll need to convert degrees to radians.
 * The GPS coordinates for our Dublin office are 53.339428, -6.257664.
 * You can find the Customer list [here](https://gist.github.com/brianw/19896c50afa89ad4dec3).

> ⭑ Please don’t forget, your code should be production ready, clean and tested!

## Installation
* Install [Node.js® 8+](https://nodejs.org/en/download/package-manager/) with [npm](https://www.npmjs.com/)
* Clone the repo: `git clone https://github.com/fabrice404/intercom-party.git`
* Install dependencies: `npm install`

## Tests
To launch tests use this command: `npm test`
* Code linting: [Standard](https://github.com/standard/standard)
* Unit testing: [Mocha](https://github.com/mochajs/mocha) & [Chai](https://github.com/chaijs/chai)
* Code coverage: [Istanbul](https://github.com/istanbuljs/nyc)

## Run
To run the app use this command: `npm start`, it will run with default values given in the question, these values can be overridden with arguments.

Argument | Description | Example
--- | --- | ---
--lat | Latitude of the party location | npm start -- --lat 12.34
--lng | Longitude of the party location | npm start -- --lng 56.78
--distance | Max distance between customer and party location (km) | npm start -- --distance 50
--file | Customer file path | npm start -- --file /tmp/customers-MMXVIII.json

Example: `npm start -- --lat 12.34 --lng 56.78 --distance 50 --file /tmp/customers-MMXVIII.json`
