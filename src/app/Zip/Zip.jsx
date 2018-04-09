const React = require('react');
import PropTypes from 'prop-types';

const ZipInput = require('./ZipInput.jsx');
const Location = require('./Location.jsx');

//Component handles searching zip codes
class Zip extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            zip: '',//The zip of the location we're searching
            locationName: null//The name of the location we're searching
        }

        this.displayResult = this.displayResult.bind(this);
        this.editZip = this.editZip.bind(this);
    }

    //Call when user clicks to edit location
    editZip(){
        //Notify app that location is being changed
        this.props.onChangeLocation();

        //Reset location name
        this.setState({
            locationName: null
        });
    }

    //Call when user has selected a valid location so we can display location name as result
    displayResult(zip, locationName){
        this.setState({zip, locationName});
        //Notify app that location has been selected so we can search for businesses there
        this.props.onLocationSelected(locationName);
    }

    render(){
        return (
            <div id="Zip" className="searchSection">
                <p>Find a business in </p>
                {   //Ternary operator returns either location name results if valid ZIP has been entered/searched
                    //or input field to enter/search a ZIP
                    this.state.locationName?
                        <Location name={this.state.locationName} editZip={this.editZip} />:
                        <ZipInput previousZip={this.state.zip} onLocationSelected={this.displayResult} />
                }
            </div>
        );
    }
}

Zip.propTypes = {
    onLocationSelected: PropTypes.func.isRequired,
    onChangeLocation: PropTypes.func.isRequired
};

module.exports = Zip;
