const React = require('react');
const Zip = require('./Zip');//Part of UI for searching ZIP code
const Business = require('./Business');//Part of UI for searching for business

//Component manages all React components in app
class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            locationName: '',//Store location name
            businessSearchEnabled: false//Whether business search is enabled
        };

        //Bind functions
        this.locationSelected = this.locationSelected.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
    }

    //Call when user selects a valid location so we can search businesses there
    locationSelected(locationName){
        this.setState({
            locationName,
            businessSearchEnabled: true
        });
    }

    //Call when user clicks to change location so we can disable business search until
    //a new valid location has been selected
    changeLocation(){
        this.setState({
            businessSearchEnabled: false
        });
    }

    //Render Zip and Businesss components
    render() {
        return (
            <div>
                <Zip onChangeLocation={this.changeLocation} onLocationSelected={this.locationSelected}/>
                <Business enabled={this.state.businessSearchEnabled} locationName={this.state.locationName}/>
            </div>
        );
        
    }
}

module.exports = App;