const React = require('react');
import PropTypes from 'prop-types';

const PlacesService = require('../../PlacesService.js');
const Clarifai = require('clarifai');
const ClarifaiApp = require('../../ClarifaiService.js');
const BusinessDetails = require('./BusinessDetails.jsx');

//A single result from results list from search
//Displays basic info - name, address, thumbnail
class BusinessResult extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            hidden: false,//Whether result should be hidden
            showDetails: false,//Whether business's details dropdown should be shown
            detailsLoaded: false,//Whether business's additional details have been loaded
            phoneNum: '',//Phone number for business - part of additional details
            website: '',//Website for business - part of additional details
            categories: '',//Categories for business - part of additional details
            photos: []//Array of photos for business - part of additional details
        }

        //If delay prop provided, wait for the duration of the delay before making result visible
        if(props.delay){
            this.state.hidden = true;

            //Use setTimeout to update this.state.hidden after delay
            setTimeout((()=>{
                this.setState({hidden: false});
            }).bind(this),props.delay);
        }
        /*
        else{
            //If no delay provided, just make result visible instantly
            this.state.hidden = false;
        }*/

        //Bind functions
        this.onDetailsExpandClick = this.onDetailsExpandClick.bind(this);
        this.handleDetailResults = this.handleDetailResults.bind(this);
        this.loadDetails = this.loadDetails.bind(this);
    }

    //Submit request to Places Service for additional details on this place
    loadDetails(){
        //Get details from google places with place_id prop
        PlacesService.getDetails({
            placeId: this.props.place_id
        }, this.handleDetailResults);
    }

    //Callback handles results from details request
    handleDetailResults(results){
        
        //Store initial detail info - photos still need some additional steps
        this.setState({
            phoneNum: results.formatted_phone_number,
            website: results.website,
            categories: results.types.join(', ')//Join types as comma separated string
                .replace(/_/g, ' ')//Replace all underscores with spaces so it looks more natural
        });


        const photos = results.photos.slice(0,5);//Get array of up to first 5 photos
        const numPhotos = photos.length;//Number of photos, should be <= 5
        const photoUrls = new Array(numPhotos);//Array of photo urls for use as srcs for img tags

        //Get urls from photos
        for(let i = 0; i < numPhotos; ++i){
            photoUrls[i] = photos[i].getUrl({
                maxWidth: 360
            });
        }  

        //Submit all photos to Clarifai to get tags from its predictions of photo contents
        for(let i = 0; i < numPhotos; ++i){
            //Get prediction for each photo url
            ClarifaiApp.models.predict(Clarifai.GENERAL_MODEL,
                photoUrls[i]).then((response)=>{
                    //Get current array of photos stored in state, will modify this and then update state
                    let photos = this.state.photos;

                    //Get first 3 tags from clarifai
                    const tags = response.outputs[0].data.concepts.slice(0,3);

                    //Construct a comma separated string out of the tags for rendering in image overlay
                    let tagString = '';
                    for(let i = 0; i < tags.length; ++i){
                        tagString += tags[i].name;

                        if(i < tags.length - 1){
                            tagString += ', ';
                        }
                    }

                    //Store new photo object w/ url and tags in photos list
                    photos.push({
                        url: photoUrls[i],
                        tags: tagString
                    });

                    //Update state's photo list
                    this.setState({
                        photos
                    });
                }).catch((err)=>{
                    //Catch error from promise
                    console.log(err); 
                });
        }
    }

    //Call when user clicks result to expand details
    onDetailsExpandClick(){
        //If details haven't been loaded yet, load them
        if(!this.state.detailsLoaded){
            this.loadDetails();
            this.setState({
                detailsLoaded: true,
                showDetails: true
            });
        }
        //Otherwise, use previously loaded details
        else{
            this.setState({showDetails: !this.state.showDetails});
        }
    }

    render(){
        return(
            <div className={`result${this.state.hidden?' waiting' : ''}`}>
                <div className="detailsExpandButton" onClick={this.onDetailsExpandClick}>
                    <img className="icon" src={this.props.thumbnail} />
                    <div className="textInfo">
                        <span className="name">{this.props.name}</span>
                        <span className="address">{this.props.address}</span>
                    </div>
                    <img className={`expandArrow${this.state.showDetails?' expanded':''}`} src="../assets/images/expandArrow.png" alt="expand details"/>
                </div>
                <BusinessDetails show={this.state.showDetails} photos={this.state.photos}
                        categories={this.state.categories} website={this.state.website} phoneNum={this.state.phoneNum} />
            </div>
        );
    }
}

BusinessResult.propTypes = {
    place_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
}

module.exports = BusinessResult;