const React = require('react');
import PropTypes from 'prop-types';

const PlacesService = require('../../PlacesService.js');

class BusinessDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentPhoto: 0//Index of current photo to display in gallery
        };

        this.changePhoto = this.changePhoto.bind(this);
    }

    //Modify current photo index to show a different photo
    changePhoto(direction){
        //Modify current photo ind by given direction (-1 to go back, 1 to go forward)
        let newPhotoInd = this.state.currentPhoto + direction;

        //Number of photos we're navigating through
        const numPhotos = this.props.photos.length;

        //Keep inds btwn 0-numPhotos and wrap around in either direction (so -1->4, 5->0)
        if(newPhotoInd < 0) newPhotoInd += numPhotos;
        else newPhotoInd %= numPhotos;

        //Update state
        this.setState({
            currentPhoto: newPhotoInd
        });
    }

    render(){       
        //Get object for current photo to render
        const currentPhoto = this.props.photos[this.state.currentPhoto];

        //If current photo is undefined, details data isn't fully loaded in to display yet, so don't render anything
        if(!currentPhoto){
            return null;
        }

        //Show phone number, website, categories, and image gallery/viewer for business
        return(
            <div className={`details ${this.props.show?' expanded':''}`}>
                <p>Phone: {this.props.phoneNum}</p>
                <p><a href={this.props.website}>Visit website</a></p>
                
                <div className="imageView">
                    <img src={currentPhoto.url} alt={currentPhoto.tags}/>
                    <div className="imageOverlay">
                        <div className="prev clickZone"
                            onClick={()=>{
                                this.changePhoto(-1);
                            }}>
                            <img src="../assets/images/prevArrow.png" alt="previous image"/>
                        </div>
                        <div className="next clickZone"
                            onClick={()=>{
                                this.changePhoto(1);
                            }}>
                            <img src="../assets/images/nextArrow.png" alt="next image"/>
                        </div>
                        <p>{currentPhoto.tags}</p>
                    </div>
                </div>

                <p className="categories">Categories: {this.props.categories}</p>
            </div>
        );
    }
}

BusinessDetails.propTypes = {
    show: PropTypes.bool.isRequired,
    photos: PropTypes.array.isRequired,
    categories: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    phoneNum: PropTypes.string.isRequired
};

module.exports = BusinessDetails;