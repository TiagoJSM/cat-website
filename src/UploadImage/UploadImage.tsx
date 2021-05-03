import React from 'react';
import ImageUploader from 'react-images-upload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadImage } from '../actions/catActions';

type State = { picture: any };
type Props = { uploadImage: Function };

const mapStateToProps = () => { 
  return ({ });
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
      { uploadImage },
      dispatch);
}

class UploadImage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
     this.state = { picture: undefined };
  }

  onChange = (picture: any[]) => {
      this.setState({
          picture: picture.length > 0 ? picture[0] : null,
      });

      if(picture.length > 0)
      {
        this.props.uploadImage(picture[0]);
      }
  }

  render(){
      return (
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
