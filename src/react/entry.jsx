// 3rd Party
const React = require('react')
const ReactDOM = require('react-dom')

// Local
const App = require('./App.jsx')

// See? React and JSX are here if you need it

const reactEntryContainerEl = document.createElement('div')

document.body.appendChild(reactEntryContainerEl)

ReactDOM.render(<App />, reactEntryContainerEl)

//Use maps geocode api to get city name from zipcode
//http://maps.googleapis.com/maps/api/geocode/json?components=postal_code:48827
//response.results.formatted_address