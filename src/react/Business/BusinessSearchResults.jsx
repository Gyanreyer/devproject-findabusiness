const React = require('react');
import PropTypes from 'prop-types';

class Result extends React.PureComponent{
    constructor(props){
        super(props);

        if(props.delay){
            this.state = {
                hidden: true
            }

            setTimeout((()=>{
                this.setState({hidden: false});
            }).bind(this),props.delay);
        }
        else{
            this.state = {
                hidden: false
            }
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.onSelected(this.props.place_id);
    }

    render(){
        return(
            <div className={`result${this.state.hidden?' waiting' : ''}`} onClick={this.onClick}>
                <img className="icon" src={this.props.thumbnail} />{this.props.name}
            </div>
        );
    }
}

Result.propTypes = {
    onSelected: PropTypes.func.isRequired,
    place_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

class BusinessSearchResults extends React.PureComponent{
    constructor(props){
        super(props);

        this.handleSelectClick = this.handleSelectClick.bind(this);
    }

    handleSelectClick(place_id){
        this.props.selectBusiness(place_id);
    }

    render(){
        let delay = 0

        return(
            <div id="searchResults">
            {
                this.props.searchResults.map((result)=>{
                    //Each result will appear 0.05s after the last
                    delay+=50;

                    return (
                    <Result key={result.place_id}
                        delay={delay}
                        name={result.name}
                        place_id={result.place_id}
                        thumbnail={result.photos ? result.photos[0].getUrl({maxWidth:240}) : result.icon}                     
                        onSelected={this.handleSelectClick} />
                );})
            }
            </div>
        );
    }
}

//Require searchResults and editName props
BusinessSearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired,
    selectBusiness: PropTypes.func.isRequired//Call when user clicks/selects a result
};

module.exports = BusinessSearchResults;