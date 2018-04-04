const React = require('react');
const ZipInput = require('./ZipInput.jsx');

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        //Initialize state stuff here as needed
        this.state = {
            searchZip: null
        }

        this.handleZipSearch = this.handleZipSearch.bind(this);
    }

    requestZipInfo(zip) {
        const xhr = new XMLHttpRequest();
    }

    //Return true if zip is valid, false if not
    validateZip(zip) {
        //Basic check - ensure zip is exactly 5 numeric digits
        //I wish regex was like, readable for normal human beings
        return /^(\d{5})$/.test(zip);
    }

    handleZipSearch(zip) {
        //Validate zip, return early if isn't valid
        if (!this.validateZip(zip)) return;

        //Continue if zip IS valid
        this.setState({ searchZip: zip });
    }

    render() {
        return (
            <div id="ZipSearch">
                <h1>Find your business</h1>
                <ZipInput onTextUpdate={this.handleZipSearch} />
            </div>
        );
    }
}

module.exports = App;