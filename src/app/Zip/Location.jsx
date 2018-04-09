const React = require('react');
import PropTypes from 'prop-types';

//Component shows name of selected location and allows user to edit to select a new one
class Location extends React.PureComponent{
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
            <div id="Location" title="Change location" onClick={this.handleEditClick}>
                <span className="resultName">{this.props.name.split(',')[0]}</span>
                <img id="EditZip" src="./assets/images/pencil.svg"/>
            </div>
        );
    }
}

//Require name and editZip props
Location.propTypes = {
    name: PropTypes.string.isRequired,
    editZip: PropTypes.func.isRequired,
};

module.exports = Location;