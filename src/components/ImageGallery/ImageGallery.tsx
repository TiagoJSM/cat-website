import './ImageGallery.css';

type Props = { images: string[] };

function ImageGallery(props: Props) {
    return (
        <div className="image-gallery">
            {props.images.map((image, idx) => (<img className="image" src={image} key={ idx } />))}
        </div>
    );
}

export default ImageGallery;
