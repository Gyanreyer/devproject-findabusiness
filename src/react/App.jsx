const React = require('react');
const ZipSearch = require('./Zip.jsx');//Page for searching ZIP code

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        //Initialize state stuff here as needed
        this.state = {
            hasZip: false
        };
    }

    render() {
        if(this.state.hasZip)
            return <div></div>//PLACEHOLDER
        else
            return <Zip />
    }
}

module.exports = App;