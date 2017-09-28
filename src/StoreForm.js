import React from 'react';
import Immutable, { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Control, Form, Errors, actions } from 'react-redux-form/immutable';
import Dropzone from 'react-dropzone';

import FileInputsComponent from './FileInputs';

export class NewStoreForm extends React.Component {
  static propTypes = {
    files: PropTypes.instanceOf(Immutable.List).isRequired,
    addFile: PropTypes.func.isRequired,
  }

  addFiles(fileArr) {
    fileArr.map((file) => { // eslint-disable-line array-callback-return
      this.props.addFiles(fromJS({
        file,
        name: '',
        type: [],
      }));
    });
  }

  render() {
    return (
      <Form
        model="storeRegistration"
        className="ujo-form"
        onSubmit={values => this.props.onSubmit(values)}
      >
        <div className="form-item">
          <Control.text
            model=".storeName"
            updateOn={['change', 'blur']}
            placeholder="Store Name"
            validators={{
              required: val => val && val.length > 2,
            }}
          />
        </div>
        <div className="form-item">
          <Control.textarea
            model=".storeDescription"
            placeholder="Store Description"
            updateOn={['change', 'blur']}
            validators={{
              required: val => val && val.split(' ').length > 5,
            }}
          />
        </div>
        <hr />
        <div className="tracklist-container">
          {this.props.files.map((file, i) =>
            (<FileInputsComponent
              key={file.get('file').name}
              file={file}
              fileIndexInArray={i}
            />),
          )}
        </div>
        <Dropzone
          onDrop={fileArr => this.addFiles(fileArr)}
          style={{
            height: '200px',
            width: '100%',
            marginTop: '50px',
            border: '1px solid orange',
          }}
        >
          <div className="drop-container-title">Upload Multiple Files</div>
        </Dropzone>
        <hr />
        <div className="form-item text-center">
          <button
            type="submit"
            className="btn"
          >
            <span>Submit</span>
          </button>
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.storeRegistration.get('files'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFiles: fileArr => dispatch(actions.push('storeRegistration.files', fileArr)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewStoreForm);
