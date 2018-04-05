const React = require('react');
import PropTypes from 'prop-types';

const PlacesService = require('../../PlacesService.js');
const SearchResults = require('./BusinessSearchResults.jsx');

class BusinessInput extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            searchName: '',
            loading: false,
            results: []
        };

        this.requestBusinessSearch = this.requestBusinessSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    requestBusinessSearch(name){
        //Require that name be more than one letter
        if(name.length <= 1)
        {
            this.setState({
                searchName: name,
                loading: false,
                results: []
            });

            return;
        }
        else{
            this.setState({
                searchName: name,
                loading: true
            });

            PlacesService.textSearch({
                query: `${this.props.zip} ${this.state.searchName}`,
                type: ''
            }, (results)=>{
                console.log(results);
                this.setState({
                    loading: false,
                    results
                });
            });
        }
    }

    handleBusinessSelected(place_id){
        
    }

    //Call when contents of text field are updated
    handleKeyPress(e) {
        if (e.key === 'Enter')
            this.requestBusinessSearch(e.target.value);
    }

    handleTextChange(e){
        this.setState({searchName: e.target.value});
    }

    render(){
        const zipValid = this.props.zip.length == 5;

        return(
            <div>
                <div className={`searchSection${zipValid?'':' disabled'}`}>
                    <p>I'm looking for </p>
                    <div id="businessSearch">
                        <input id="ZipInput" type="text"
                            value={this.state.searchName} placeholder="enter a business name or keyword here" size="31" 
                            disabled={!zipValid}
                            onChange={this.handleTextChange}
                            onKeyPress={this.handleKeyPress}></input>
                        
                        
                        <SearchResults selectBusiness={this.handleBusinessSelected} searchResults={this.state.results} />
                    </div>
                    <div className={`loadingSpinner${this.state.loading?" animating":""}`}></div>

                </div>
                
            </div>
        );
    }
}

BusinessInput.propTypes = {
    zip: PropTypes.string.isRequired,
    onBusinessSelected: PropTypes.func.isRequired
};

module.exports = BusinessInput;