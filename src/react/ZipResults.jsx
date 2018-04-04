const React = require('react');
import PropTypes from 'prop-types';

class ZipResults extends React.PureComponent{
    constructor(props){
        super(props);

        this.handleEditClick = this.handleEditClick.bind(this);
    }

    //Clear this result and allow user to search a new ZIP
    handleEditClick(){
        this.props.editZip();
    }
    
    //Show location name and allow user to edit by clicking
    render(){
        //Pencil icon sourced from https://thenounproject.com/
        //Credit to Julia Simplicio
        return(
            <div id="ZipResults" title="Change location" onClick={this.handleEditClick}>
                <span className="locationName">{this.props.locationName}</span>
                <img id="EditZip" src="./assets/images/pencil.svg"/>
            </div>
        );
    }
}

//Require locationName and editZip props
ZipResults.propTypes = {
    locationName: PropTypes.string.isRequired,
    editZip: PropTypes.func.isRequired,
}

module.exports = ZipResults;