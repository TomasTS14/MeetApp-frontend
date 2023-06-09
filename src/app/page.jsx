"use client"
import Image from 'next/image'
import { Inter, Space_Grotesk } from 'next/font/google'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './page.module.css'
import SSRProvider from 'react-bootstrap/SSRProvider';
import { useEffect, useState } from 'react'
import { Button, Container, Form, Stack, Alert } from 'react-bootstrap'
import { sendLoginData } from '@/services';
import { useRouter } from 'next/navigation';
import './globals.css';
import "swiper/css";
import "swiper/css/effect-cards";
import { ThemeProvider } from '@mui/material';
import { theme } from './components/theme';




const inter = Inter({ subsets: ['latin'] })
const space_grotesk = Space_Grotesk({ subsets: ['latin'] })


export default function Login() {
  const [user, setUser] = useState(null);
  const [credentialsWrong, setCredentialsWrong] = useState(false);
  const [activateGeolocationMsg, setActivateGelocationMsg] = useState(true);
  const [serverError, setServerError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!!localStorage.getItem("credentials")) {
      console.log("login=>useEffect()=>localStorage.getItem(credentials) is true");
      router.push('/home');
    }
    (async () => {
      if (navigator.geolocation) {
        const geolocationActive = await navigator.permissions.query({ name: "geolocation" });
        navigator.geolocation.getCurrentPosition((() => { }));
        if (geolocationActive.state !== "granted") {

          setActivateGelocationMsg(true);
        } else {
          //navigator.geolocation.getCurrentPosition(getCoordinates);
          setActivateGelocationMsg(false);
        }
      }

    })();

  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();
    setCredentialsWrong(false);

    const form = e.currentTarget;

    if (form.checkValidity() === false) {

      e.stropPropagation();
    } else {
      const username = form.elements.username.value;
      const password = form.elements.password.value;

      const data = {
        username: username,
        password: password,
      }

      const response = await sendLoginData(data);
      if (response.ok) {
        const resultFetchJSON = await response.json();
        console.log(resultFetchJSON);
        localStorage.setItem("credentials", JSON.stringify(resultFetchJSON))
        setUser(response.appuser)
        // redirect(<Home />)
        router.push('/home')
      } else if (response.status === 404) {
        setCredentialsWrong(true);
      } else if (response.status === 400) {
        setServerError(true);
      } else if (response.status === 500) {
        setServerError(true);
      }

    }
  }


  return (
    <SSRProvider>
      <ThemeProvider theme={theme} >

        <Container className='col-sm-11 col-xl-4 bg-light p-4 rounded '>
          <Form onSubmit={(e) => { handleSubmit(e) }} >
            <div>
              {activateGeolocationMsg &&
                (
                  <Form.Group className='mt-3'>
                    <Alert variant="warning">Activate geolocation</Alert>
                  </Form.Group>
                )}
              <Form.Group className='mb-3' >
                <Form.Label>Username</Form.Label>
                <Form.Control required name='username' />
                <Form.Control.Feedback type="invalid">Enter your username</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' name='password' />
                <Form.Control.Feedback type="invalid">Enter your username</Form.Control.Feedback>
              </Form.Group >
              <Form.Group className='d-flex gap-2 pt-2 '>
                <button className=' buttonItem' type='submit'>Log in</button>
                <button className="buttonItem blue" onClick={(e) => {
                  e.preventDefault();
                  router.push('/signup');
                }}>Sign up</button>
              </Form.Group>

              {
                credentialsWrong && (
                  <Form.Group className='mt-3'>
                    <Alert variant="danger">Wrong username or password</Alert>
                  </Form.Group>

                )
              }{serverError && (
                <Form.Group className='mt-3'>
                  <Alert variant="danger">Server error. Try later.</Alert>
                </Form.Group>
              )

              }
            </div>
          </Form>
        </Container>
      </ThemeProvider>
    </SSRProvider >

  )
}

