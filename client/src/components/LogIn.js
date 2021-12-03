
import auth from "../auth";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';



import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import LockIcon from '@mui/icons-material/Lock';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">

        DASH-Team

      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const user={
        Email:data.get('email'),
        Password:data.get('password')
    };
    axios.post('http://localhost:8000/user/logIn', user)
    .then(res => {
        if (res.data.msg === "Invalid Password") {
            alert("Invalid Password");
            localStorage.removeItem("token");
        }
        else if (res.data.msg === "Email does not exists") {
            alert("Email Does Not Exist");
            localStorage.removeItem("token");
        }
        else {
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("Email",user.Email);
            if(user.Email==="shaza@gmail.com"){
                localStorage.setItem("Type",false);
            }else{
                localStorage.setItem("Type",true)
            }
            // axios.post('http://localhost:8000/user/type',{Email:user.Email})
            // .then(res=>{
            //     localStorage.setItem("hamda",false);
            //     if(res.data==="true"){
            //         localStorage.setItem("Type",true);

            //     }else if(res.data==="false"){
            //         localStorage.setItem("Type",false);
            //     }
            // })
            auth.login(()=>{
                //this.props.history.push("/");
                window.location = '/ '
            })
            

        }

    }).catch(err => console.log(err));

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://ddi-dev.com/uploads/ticket-booking-software.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
              <LockIcon />
            
            <Typography component="h1" variant="h5" color = 'black'>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
              <Button
                type="submit"
                style={{width : '100%'}}
               
                className = "btn btn-dark"
                
                
              >
                Sign In
              </Button>
              <Grid container>
                
                <Grid item xs>
                  <Link href="/sign" variant="body2" style = {{color:'black'}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Guest/HomeGuest" variant="body2" style = {{color:'black'}}>
                    {"Continue as a guest"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}