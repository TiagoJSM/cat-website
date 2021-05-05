import React from 'react';
import ImageUploader from 'react-images-upload';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import catApi from '../../api/catApi';

import './UploadImage.css'

type State = { picture: any, uploading: boolean, errorMessage: string };
type Props = RouteComponentProps<any>;

const mapStateToProps = () => { 
  return ({ });
}

class UploadImage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
     this.state = { picture: undefined, uploading: false, errorMessage: null };
  }

  onChange = (picture: any[]) => {
      this.setState({
        picture: picture.length > 0 ? picture[0] : null,
      });

      if(picture.length > 0)
      {
        this.setState({ uploading: true });
        catApi.addImage(picture[0])
          .then(res => {
            this.props.history.push('/');
          })
          .catch(err => {
            // aparently axios doesn't provide the error message, mocking one for the purpose of this
            this.setState({ uploading: false, errorMessage: 'Error uploading image, please try again'});
          });
      }
  }

  render = () => {
    const { uploading, errorMessage } = this.state;
      return (
        <div className="upload-image">
          <div className="error-message">{errorMessage}</div>
          {uploading ?
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
            /> :
            <ImageUploader
                  withIcon
                  withPreview
                  singleImage
                  buttonText='Choose images'
                  onChange={this.onChange}
                  imgExtension={['.jpg', '.png']}
                  maxFileSize={5242880}
              />
          }
        </div>);
  }
}

export default withRouter(connect(mapStateToProps)(UploadImage));
