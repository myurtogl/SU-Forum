import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import './App.css'

const NavigationBar = ({ account, setModalEnabled }) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="true"
        // bg="primary"
        // className="navbar"
        style={{ background: '#99CED3' }}
        variant="dark"
        fixed="top"
      >
        {/* <Container> */}

        <Navbar.Brand
          href="http://localhost:3000/"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#4D6D9A',
            fontWeight: '700',
          }}
        >
          {' '}
          <Image
            src="./favicon.ico"
            thumbnail="true"
            style={{
              marginRight: '10px',
              backgroundColor: 'gray',
              fontSize: '20px',
            }}
          />{' '}
          SU Forum
        </Navbar.Brand>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">
              <span
                id="account"
                style={{
                  fontSize: '16px',
                  marginRight: '20px',
                  color: '#4D6D9A',
                  fontWeight: '600',
                }}
              >
                {account}
              </span>
            </small>
            <small>
              <Button
                variant="outline-dark"
                // styles={{ background,: '#EDB5BF' }}
                onClick={() => setModalEnabled(true)}
              >
                Register
              </Button>
            </small>
          </li>
        </ul>
      </Navbar>
    </>
  )
}

export default NavigationBar
