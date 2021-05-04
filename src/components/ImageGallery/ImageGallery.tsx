// @ts-ignore
import Heart from "react-animated-heart";

import Image from '../../models/image';

import './ImageGallery.css';

type Props = { 
    images: Image[],
    favouriteImage: Function,
    unfavouriteImage: Function 
};

function ImageGallery(props: Props) {
    const { images, favouriteImage, unfavouriteImage } = props;
    return (
        <div className="image-gallery">
            {images.map((image, idx) => (
                <div key={ idx } className="image-wrapper">
                    <img src={image.url} />
                    <Heart isClick={image.favourite} onClick={() => image.favourite ? unfavouriteImage(image.id) : favouriteImage(image.id) }/>
                </div>
            ))}
        </div>
    );
}

export default ImageGallery;
