const React = require('react');
const Zip = require('./Zip');//Part of UI for searching ZIP code
const Business = require('./Business');//Part of UI for searching for business

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        //Initialize state stuff here as needed
        this.state = {
            zip: '',
            businessInfo: null
        };

        this.zipSelected = this.zipSelected.bind(this);
        this.removeZip = this.removeZip.bind(this);
        this.businessSelected = this.businessSelected.bind(this);
    }

    //Call when user selects a valid zip
    zipSelected(zip){
        this.setState({zip});

        console.log('SELECTED ' + zip);
    }

    removeZip(){
        this.setState({zip:null});
    }

    businessSelected(businessInfo){
        this.setState({businessInfo});
    }

    render() {
        return (
            <div>
                <Zip onChangeZip={this.removeZip} onZipSelected={this.zipSelected}/>
                <Business zip={this.state.zip} onBusinessSelected={this.businessSelected}/>
            </div>
        );
        
    }
}

module.exports = App;