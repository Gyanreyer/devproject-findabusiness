const React = require('react');
import PropTypes from 'prop-types';

const PlacesService = require('../PlacesService.js');

class ZipInput extends React.PureComponent {
    //Constructor initializes component
    constructor(props) {
        super(props);

        this.state = {
            zip: '',//The zip we last searched for successfully
            zipIsValid: true,//Whether zip being searched is valid
            loading: false
        };

        //Bind functions so they can use 'this' keyword
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSearchResponse = this.handleSearchResponse.bind(this);
        this.requestZipInfo = this.requestZipInfo.bind(this);
        this.validateZip = this.validateZip.bind(this);
    }

    //Handle the response from zip search
    handleSearchResponse(response) {
        this.setState({loading: false});

        //If response is empty, return early
        if (response.length == 0) {
            //Indicate that ZIP was invalid
            this.setState({ zipIsValid: false });
            return;
        }
        else {
            const locationName = response[0].formatted_address.split(',')[0];

            this.setState({
                zipIsValid: true
            });

            this.props.onLocationSelected(this.state.zip, locationName);
        }
    }

    //Send text search to Places Service API
    requestZipInfo() {
        //Validate zip, return early if isn't valid
        if (!this.validateZip()) {
            //Indicate that ZIP was invalid
            this.setState({ zipIsValid: false });
            return;
        }

        this.setState({loading: true});

        //Search for zip code to get its city name/verify if zip code is real
        PlacesService.textSearch({
            query: this.state.zip,
            type: 'postal_code'
        }, this.handleSearchResponse);
    }

    //Return true if zip is valid, false if not
    validateZip() {
        //Basic check - ensure zip is exactly 5 numeric digits
        //I wish regex was like, readable for normal human beings
        return /^(\d{5})$/.test(this.state.zip);
    }

    //Call when contents of text field are updated
    handleKeyPress(e) {
        if (e.key === 'Enter')
            this.requestZipInfo(e.target.value);
    }

    //Render input text bar which will retrieve location info on valid ZIP codes when it's updated
    render() {
        return (
            <span>
                <input id="ZipInput" className={this.state.zipIsValid ? 'valid' : 'invalid'} type="text" maxLength="5" size={this.state.zip.length > 0 ? "2":"18"} 
                    value={this.state.zip} placeholder="enter your ZIP code here"
                    onChange={(e)=>{this.setState({zip:e.target.value})}}
                    onKeyPress={this.handleKeyPress} onBlur={(e) => { this.requestZipInfo(e.target.value) }}></input>
                <div className={`loadingSpinner${this.state.loading?" animating":""}`}></div>
            </span>
        );
    }
}

//Ensure onSubmit prop is present and is a function
ZipInput.propTypes = {
    onLocationSelected: PropTypes.func.isRequired
};

module.exports = ZipInput;