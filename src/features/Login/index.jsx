import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
    if (email === '' || password === '') return;

    // localStorage.setItem(AUTHORIZATION_KEY, AccessToken.Token);
    // localStorage.setItem(AUTHORIZATION_EXPIRY, moment().add(30, 'minutes'));
    // localStorage.setItem(AUTHORIZATION_EXPIRY, AccessToken.ExpiresIn);
    localStorage.setItem(AUTHORIZATION_KEY, values);
    history.push('/');
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
          <CardHeader title={'CRUD'} className="text-center"></CardHeader>
          <CardContent className="pt-0 pb-2">
            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
              <InputField
                name="email"
                label="Email"
                variant="outlined"
                className="mb-3"
                form={form}
              />
              <InputField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                className="mb-3"
                form={form}
              />
              <div className="text-right">
                <Button type="submit" variant="contained" color="primary" className="mb-3">
                  {/* {isSubmitting && <CircularProgress size={20} color="inherit" />} */}
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
