import React from 'react';
import ImageUploader from 'react-images-upload';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import catApi from '../../api/catApi';

type State = { picture: any, uploading: boolean };
type Props = RouteComponentProps<any>;

const mapStateToProps = () => { 
  return ({ });
}

class UploadImage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
     this.state = { picture: undefined, uploading: false };
  }

  onChange = (picture: any[]) => {
      this.setState({
        picture: picture.length > 0 ? picture[0] : null,
      });

      if(picture.length > 0)
      {
        this.setState({ uploading: true})
        catApi.addImage(picture[0])
          .then(res => {
            this.props.history.push('/')
          })
          .catch(err => {
         
          });
      }
  }

  render = () => {
    const { uploading } = this.state;
      return (
        uploading ?
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
      );
  }
}

export default withRouter(connect(mapStateToProps)(UploadImage));
