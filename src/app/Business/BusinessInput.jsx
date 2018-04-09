const React = require('react');
import PropTypes from 'prop-types';

const PlacesService = require('../../PlacesService.js');
const SearchResults = require('./BusinessSearchResults.jsx');

class BusinessInput extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            searchTerm: '',//Search term we'll submit to Google Places API
            lastSearchTerm: '',//Previous search term - keep track to avoid duplicate requests
            loading: false,//Whether search request result is loading
            results: []//All results from search that are being displayed - empty when no results
        };

        //Bind functions
        this.setTextInputRef = this.setTextInputRef.bind(this);
        this.setInputFocus = this.setInputFocus.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.handleSearchResults = this.handleSearchResults.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    //Called every time component's props update
    componentWillReceiveProps(nextProps){
        if(nextProps.enabled){
            //If component becomes enabled, set focus on input
            this.setInputFocus();  

            //If user selected a new location, reset state
            if(nextProps.locationName !== this.props.locationName){
                //Reset everything except current search term in input field
                this.setState({
                    lastSearchTerm: '',
                    loading: false,
                    results: []
                });
            }
        }   
    }

    //Gets ref to text input element so we can set focus on it
    setTextInputRef(element){
        this.textInput = element;
    }

    //Set focus on text input from ref
    setInputFocus(){
        this.textInput.removeAttribute('disabled');//Remove disabled attrib so input is interactible again
        this.textInput.focus();
        this.textInput.select();
    }

    //Send request to Google Places API
    submitSearch(){
        //Term that we will use for query
        const searchTerm = this.state.searchTerm;

        //Require that name not be an empty string
        if(searchTerm.length === 0)
        {
            //Reset state
            this.setState({
                loading: false,
                lastSearchTerm: '',
                results: []
            });
        }
        //Avoid unneeded duplicate requests by checking if search term has changed at all from the term whose results are currently being displayed
        else if(searchTerm !== this.state.lastSearchTerm){
            this.setState({
                lastSearchTerm: searchTerm,//Store this search term as what was previously searched to avoid unneeded duplicate requests
                loading: true//Begin showing loading spinner until results are received
            });

            //Send test search with query in format "[search term] in [location]"
            PlacesService.textSearch({
                //Searching by zip sucks - like Schenectady, NY's zip code is 12345 and google doesn't know what to do with that
                //Instead, using the formatted name of the location gets way cleaner results!
                query: `${searchTerm} in ${this.props.locationName}`
            }, this.handleSearchResults);
        }
    }

    //Handle search results by storing in state
    handleSearchResults(results){
        this.setState({
            loading: false,
            results
        });
    }

    //Check if user pressed tab/enter on input to submit search
    handleKeyPress(e) {
        if (e.keyCode === 9 || e.keyCode === 13)
            this.submitSearch();
    }

    //Update state so search term always matches input's val
    handleTextChange(e){
        this.setState({searchTerm: e.target.value});
    }

    render(){
        return(
            <div id="Business">
                <div className={`searchSection${this.props.enabled?'':' disabled'}`}>
                    <p>I'm looking for </p>
                    <div id="businessSearch">
                        <input id="BusinessInput" type="text"
                            ref={this.setTextInputRef}
                            placeholder="enter a business name or keyword here"
                            disabled={!this.props.enabled}
                            onChange={this.handleTextChange}
                            onKeyDown={this.handleKeyPress}/>
                        
                        <SearchResults searchResults={this.state.results} />
                    </div>
                    <div className={`loadingSpinner${this.state.loading?" animating":""}`}></div>
                </div>
                
            </div>
        );
    }
}

BusinessInput.propTypes = {
    locationName: PropTypes.string.isRequired,//String for location name we're searching within
    enabled: PropTypes.bool.isRequired//Whether business search should be enabled
};

module.exports = BusinessInput;