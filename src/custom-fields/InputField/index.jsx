import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

InputField.propTypes = {
  // field, form is props of formik
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  // add by me
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
};

function InputField(props) {
  // field, form is props of formik
  const { field, form, type, label, placeholder, disabled } = props;
  const { name, value, onChange, onBlur } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        invalid={showError}
      />

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default InputField;
