import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { getUploadedImages } from '../actions/catActions'
import Cat from '../models/cat';
import confusedCat from './confused-cat-clipart.png'
import React from 'react';
import { RootState } from "../store";
import Loader from 'react-loader-spinner';

type Props = { cats: Cat[], isLoadingData: boolean, getUploadedImages: any };

const mapStateToProps = (state: RootState, ownProps: any) => { 
    return ({ cats: state.cats.cats, isLoadingData: state.cats.isLoadingData });
}
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        { getUploadedImages },
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
        <div>
            <Button>bootstrap button </Button>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer">
                Learn React
            </a>
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        </div>
    );
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
    return (props.cats.length === 0 ? <NoCatsLoaded /> : <CatsList {...props}/>);
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
