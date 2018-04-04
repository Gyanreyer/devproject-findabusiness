const React = require('react');
import PropTypes from 'prop-types';

const ZipInput = require('./ZipInput.jsx');
const ZipResults = require('./ZipResults.jsx');

//Component handles searching zip codes
class ZipSearch extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            zip: null,//The zip we'll use for future searchs
            locationName: null//The name of the location we're searching
        }

        this.displayResult = this.displayResult.bind(this);
        this.editZip = this.editZip.bind(this);
    }

    editZip(){
        this.setState({
            zip: null,
            locationName: null
        });
    }

    displayResult(zip, locationName){
        this.setState({zip, locationName});
    }

    render(){
        return (
            <div id="ZipSearch">
                <p>Find your business in </p>
                {   //Ternary operator returns either location name results if valid ZIP has been entered/searched
                    //or input field to enter/search a ZIP
                    this.state.locationName?
                        <ZipResults locationName={this.state.locationName} editZip={this.editZip} />:
                        <ZipInput onLocationSelected={this.displayResult} />
                }
            </div>
        );
    }
}

module.exports = ZipSearch;
