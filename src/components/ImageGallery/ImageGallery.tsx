// @ts-ignore
import Heart from "react-animated-heart";

import Image from '../../models/image';

import './ImageGallery.css';
import Voter from "./Voter";

type Props = { 
    images: Image[],
    favouriteImage: Function,
    unfavouriteImage: Function,
    upvote: Function,
    downvote: Function 
};

function ImageGallery(props: Props) {
    const { images, favouriteImage, unfavouriteImage, upvote, downvote } = props;
    return (
        <div className="image-gallery">
            {images.map((image, idx) => (
                <div key={ idx } className="image-wrapper gallery-cell">
                    <img src={image.url} />
                    <div className="image-controls">
                        <Heart isClick={image.favourite} onClick={() => image.favourite ? unfavouriteImage(image.id) : favouriteImage(image.id) }/>
                        <Voter voteCount={image.voteCount} upvote={() => upvote(image.id)} downvote={() => downvote(image.id)}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ImageGallery;
