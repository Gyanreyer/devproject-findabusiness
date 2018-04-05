const React = require('react');
import PropTypes from 'prop-types';

const BusinessInput = require('./BusinessInput.jsx');
const BusinessResults = require('./BusinessSearchResults.jsx');

class Business extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            place_id: '',
            //businessInfo
        };

        this.displayResult = this.displayResult.bind(this);
    }

    //Display retrieved business info
    displayResult(place_id){
        console.log(place_id);

        this.setState({place_id});
    }

    render(){
        return(
            <div id="Business">
                <BusinessInput zip={this.props.zip} onBusinessSelected={this.displayResult} />
            </div>);
    }

}

Business.propTypes = {
    zip: PropTypes.string.isRequired
}

module.exports = Business;