const React = require('react');
import PropTypes from 'prop-types';

const BusinessResult = require('./BusinessResult.jsx');

//Shows all results from search in a list
class BusinessSearchResults extends React.PureComponent{
    render(){

        //Each result element will fade/slide in after a delay; the further down the list, the larger the delay
        //This produces a pretty slick looking animation
        let delay = 0;

        return(
            <div id="searchResults">
            {
                //Map each search result to a BusinessResult element
                this.props.searchResults.map((result)=>{
                    //Each result will appear 0.05s after the last
                    delay+=50;

                    //Each result displays name, address, and thumbnail
                    return (
                        <BusinessResult key={result.place_id}
                            delay={delay}
                            name={result.name}
                            address={result.formatted_address}
                            place_id={result.place_id}
                            thumbnail={result.photos ? result.photos[0].getUrl({maxWidth:240}) : result.icon} />);
                })
            }
            </div>
        );
    }
}

//Require searchResults prop for we need to render
BusinessSearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired
};

module.exports = BusinessSearchResults;