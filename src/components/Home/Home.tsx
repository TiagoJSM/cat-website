import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { getUploadedImages, favouriteImage, unfavouriteImage } from '../../actions/catActions'
import Image from '../../models/image';
import confusedCat from './confused-cat-clipart.png'
import React from 'react';
import { RootState } from "../../store";
import Loader from 'react-loader-spinner';
import ImageGallery from '../ImageGallery/ImageGallery';

import './Home.css'

type Props = { 
    images: Image[], 
    isLoadingData: boolean, 
    getUploadedImages: Function,
    favouriteImage: Function,
    unfavouriteImage: Function
};

const mapStateToProps = (state: RootState, ownProps: any) => { 
    return ({ images: state.cats.images, isLoadingData: state.cats.isLoadingData });
}
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        { getUploadedImages, favouriteImage, unfavouriteImage },
        dispatch);
}

function NoCatsLoaded() {
    return (
        <div>
            <div>Seems like there's nothing in this page, click <Link to="/upload">here</Link> to upload some cats to your home page.</div>
            <img src={confusedCat} className="confused-cat" alt="confused-cat" />
        </div>
    );
}

function CatsList(props: Props){
    return (
        <div className="cats-list-wrapper">
            <ImageGallery images={props.images} favouriteImage={props.favouriteImage} unfavouriteImage={props.unfavouriteImage} />
        </div>);
}

function LoadingCats() {
    return (
        <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
        />);
}

function CatsContent(props: Props) {
    return (props.images.length === 0 ? <NoCatsLoaded /> : <CatsList {...props}/>);
}

class Home extends React.Component<Props> {
    componentDidMount() {
        this.props.getUploadedImages();
    }

    render(){
        return (
            <div className="Home">
                {this.props.isLoadingData ? <LoadingCats /> : <CatsContent {...this.props}/>}
            </div>
          );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
