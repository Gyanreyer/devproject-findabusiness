const React = require('react');
import PropTypes from 'prop-types';

class ZipInput extends React.PureComponent {
    //Constructor initializes component
    constructor(props) {
        super(props);

        //Bind function to this
        this.handleTextUpdate = this.handleTextUpdate.bind(this);
    }

    //Call when contents of text field are updated
    handleTextUpdate(e) {
        this.props.onTextUpdate(e);//Fire onTextChange event
    }

    //Render input text bar which will retrieve location info on valid ZIP codes when it's updated
    render() {
        return (
            <input id="ZipInput" type="text" maxLength="5" placeholder="Enter your ZIP Code"
                onChange={(e) => this.handleTextUpdate(e.target.value)}></input>
        );
    }
}

//Helps validate property value so you get warnings if 
ZipInput.propTypes = {
    onTextUpdate: PropTypes.func,
};

module.exports = ZipInput;