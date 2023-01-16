import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

const NavigationBar = ({ account, setModalEnabled }) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="true"
        bg="primary"
        // className="navbar"
        variant="dark"
        fixed="top"
      >
        {/* <Container> */}

        <Navbar.Brand
          href="http://localhost:3000/"
          style={{ display: 'flex', alignItems: 'center', color: 'orange' }}
        >
          {' '}
          <Image
            src="./favicon.ico "
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
                style={{ fontSize: '16px', marginRight: '20px' }}
              >
                {account}
              </span>
            </small>
            <small>
              <Button
                variant="outline-light"
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
