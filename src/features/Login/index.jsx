import { Button, Card, CardContent } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../components/form-controls/input-field';
import { AUTHORIZATION_KEY } from '../../constants/global';
import './styles.scss';

function Login() {
  const history = useHistory();

  const validationSchema = yup.object().shape({
    email: yup.string().required('This field is required.'),
    password: yup.string().required('This field is required.'),
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

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="background">
      <div className="login-form">
        <Card>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
              {/* <FormGroup>
                <FastField name="email" component={InputField} label="Email" />
              </FormGroup>

              <FormGroup>
                <FastField
                  name="password"
                  component={InputField}
                  label="Password"
                  type="password"
                />
              </FormGroup>

              <FormGroup>
                <Button type="submit" color="primary">
                  {isSubmitting && <CircularProgress size={20} color="inherit" />}
                  <span style={{ padding: '10px' }}>Login</span>
                </Button>
              </FormGroup> */}
              <InputField name="email" label="Email" form={form} />
              {/* <InputField name="password" label="Password" type="password" form={form} /> */}
              <Button type="submit" color="primary">
                {/* {isSubmitting && <CircularProgress size={20} color="inherit" />} */}
                <span style={{ padding: '10px' }}>Login</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
