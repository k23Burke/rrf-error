import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Control, Errors, actions } from 'react-redux-form/immutable';

import close from './assets/close_grey.png';

const types = [
  'Abbrasive',
  'Big',
  'Flashy',
  'Fluffy',
  'Large',
  'Natural',
  'Portable',
  'Smashing',
  'Smelly',
  'Weird',
];

export class FileInputs extends React.Component {
  static propTypes = {
    fileIndexInArray: PropTypes.number.isRequired,
    addType: PropTypes.func.isRequired,
    removeType: PropTypes.func.isRequired,
    removeTrack: PropTypes.func.isRequired,
    nameValid: PropTypes.bool.isRequired,
    typeValid: PropTypes.bool.isRequired,
    submitFailed: PropTypes.bool.isRequired,
  }

  onAddType(thing, value) { this.props.addType(value); }

  removeType(i) {
    this.props.removeType(i);
  }

  checkSize(v) {
    console.log('size', v.size);
    console.log('value ', v);
    console.log('v.size > 0 ', (v.size > 0));
    return v && v.size > 0;
    // console.log('toJS: ', v.toJS());
  }

  render() {
    return (
      <div
        draggable
        className='file-item-container'
      >
        <div>
          <h1>File Index Type {this.props.fileIndexInArray + 1} Valid ? {this.props.typeValid ? 'true' : 'false'}</h1>
          <h5>i.e. needs more than one type</h5>
          <div className="form-item">
            <Control.text
              placeholder="File Name"
              model={`storeRegistration.files[${this.props.fileIndexInArray}].name`}
              updateOn={['change', 'blur']}
              validators={{
                required: val => val && val.length > 2,
              }}
            />
          </div>
        </div>
        <div>
          <div className="form-item">
            <Control.select
              model={`storeRegistration.files[${this.props.fileIndexInArray}].type`}
              changeAction={(v, t) => this.onAddType(v, t)}
              validators={{
                required: val => this.checkSize(val),
                // val && val.size > 0,
              }}
            >
              <option value="">Type</option>
              {types.map(g => <option key={g} value={g}>{g}</option>)}
            </Control.select>
            <h3>List from state.storeRegistration.files.types</h3>
            {this.props.file.get('type').map( (type, i) =>
              <div className="type-items-container" key={i}>
                {type}
                <img src={close} onClick={() => this.removeType(i)} alt="" />
              </div>,
            )}
            <h3>List from state.forms.storeRegistration.files[props.fileIndexInArray].type.$form.value</h3>
            {this.props.typeList.map( (type, i) =>
              <div className="type-items-container" key={i}>
                {type}
              </div>,
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    nameValid: state.forms.storeRegistration.files[props.fileIndexInArray].name.valid,
    typeValid: state.forms.storeRegistration.files[props.fileIndexInArray].type.$form.valid,
    submitFailed: state.forms.storeRegistration.files[props.fileIndexInArray].$form.submitFailed,
    typeList: state.forms.storeRegistration.files[props.fileIndexInArray].type.$form.value,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addType: type => dispatch(actions.push(`storeRegistration.files[${ownProps.fileIndexInArray}].type`, type)),
    removeType: index => dispatch(actions.remove(`storeRegistration.files[${ownProps.fileIndexInArray}].type`, index)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileInputs);
