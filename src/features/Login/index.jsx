import { Card, CardContent, CircularProgress } from '@material-ui/core';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import { AUTHORIZATION_KEY } from '../../constants/global';
import InputField from '../../custom-fields/InputField';
import './styles.scss';

function Login() {
  const history = useHistory();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required.'),
    password: Yup.string().required('This field is required.'),
  });

  const handleSubmitForm = (values) => {
    const { email, password } = values;
    if (email === 'hungtien408@gmail.com' && password === '123123') {
      // localStorage.setItem(AUTHORIZATION_KEY, AccessToken.Token);
      // localStorage.setItem(AUTHORIZATION_EXPIRY, moment().add(30, 'minutes'));
      // localStorage.setItem(AUTHORIZATION_EXPIRY, AccessToken.ExpiresIn);
      localStorage.setItem(AUTHORIZATION_KEY, values);
      history.push('/');
    }
  };

  return (
    <div className="background">
      <div className="login-form">
        <Card>
          <CardContent>
            {/* Formilk onSubmit have param values */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmitForm}
            >
              {(formikProps) => {
                // do something here
                const { values, errors, touched, isSubmitting } = formikProps;
                console.log({ values, errors, touched });
                return (
                  <Form>
                    <FastField name="email" component={InputField} label="Email" />

                    <FastField
                      name="password"
                      component={InputField}
                      label="Password"
                      type="password"
                    />

                    <FormGroup>
                      <Button type="submit" color="primary">
                        {isSubmitting && <CircularProgress size={20} color="inherit" />}
                        <span style={{ padding: '10px' }}>Login</span>
                      </Button>
                    </FormGroup>
                  </Form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
