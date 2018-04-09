const React = require('react');
import PropTypes from 'prop-types';

const PlacesService = require('../../PlacesService.js');

//Component shows input text field to allow user to select a location with a ZIP
class ZipInput extends React.PureComponent {
    //Constructor initializes component
    constructor(props) {
        super(props);

        this.state = {
            zip: props.previousZip,//The zip we last searched for successfully
            zipIsValid: true,//Whether zip being searched is valid
            loading: false//Whether waiting for response to Google Places search on zip
        };

        //Bind functions to this
        this.setTextInputRef = this.setTextInputRef.bind(this);
        this.focusOnInput = this.focusOnInput.bind(this);
        this.validateZip = this.validateZip.bind(this);
        this.requestZipInfo = this.requestZipInfo.bind(this);
        this.handleSearchResponse = this.handleSearchResponse.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    //Call when component has mounted in DOM
    componentDidMount(){
        //Set focus on input element
        //Whenever ZipInput is created on page - either on start or on edit - we know we want to set focus on the input element to edit it
        this.focusOnInput();
    }

    //Get ref to text input element so we can set focus on it by script
    setTextInputRef(element){
        this.textInput = element;
    }

    //Set focus on input
    focusOnInput(){
        this.textInput.focus();
        this.textInput.select();
    }

    //Handle the response from zip search
    handleSearchResponse(response) {
        //Update state that no longer waiting for response
        this.setState({loading: false});

        //If response is empty, return early
        if (response.length == 0) {
            //Indicate that ZIP was invalid
            this.setState({ zipIsValid: false });
            return;
        }
        else {
            //Get name of location as formatted address associated with given ZIP
            const locationName = response[0].formatted_address;

            //Indicate zip is valid
            this.setState({
                zipIsValid: true
            });

            //Notify parent that a valid location has been selected
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

        //Indicate that waiting for response - will show loading animation
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
        //Send a request when user presses tab or enter
        if (e.keyCode === 9 || e.keyCode === 13){
            e.preventDefault();//Prevent default behav b/c otherwise tab messes with our focus
            this.requestZipInfo(e.target.value);
        }
    }

    //Keep states up to date to match text changes
    handleTextChange(e){
        //If the user presset
        this.setState({zip:e.target.value, zipIsValid: true});
    }

    //Render input text bar which will retrieve location info on valid ZIP codes when it's updated
    render() {
        return (
            <span>
                <input id="ZipInput" className={this.state.zipIsValid ? 'valid' : 'invalid'} type="text" maxLength="5" 
                    value={this.state.zip} placeholder="enter your ZIP code here"
                    onChange={this.handleTextChange}
                    onKeyDown={this.handleKeyPress}
                    ref={this.setTextInputRef}
                    style={{width: ((this.state.zip.length || 21)) + 'ch'}}/>
                <div className={`loadingSpinner${this.state.loading?" animating":""}`}></div>
            </span>
        );
    }
}

ZipInput.propTypes = {
    onLocationSelected: PropTypes.func.isRequired
};

module.exports = ZipInput;