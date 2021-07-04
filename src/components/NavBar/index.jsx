import React from "react"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import "./navBar.css"
import cobalt from "../../assets/cobalt.png"
import { Box, makeStyles, Typography, Button } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `4px solid #edeff7`,
  },
  imgHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "270px",
  },
  header: {
    fontSize: "2rem",
    color: theme.palette.secondary.light,
  },
  button: {
    padding: "1px 1rem",
    borderRadius: 12,
    textTransform: "none",
    border: `4px solid ${theme.palette.secondary.main}`,
    "&:hover": {
      border: `4px solid ${theme.palette.secondary.main}`,
    },
  },
}))

export default function NavBar(props) {
  const classes = useStyles()
  return (
    <header className={classes.root}>
      <Navbar className="navgroup" collapseOnSelect expand="lg">
        <Navbar.Brand href="#home" className="ml-2">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Box className={classes.imgHeader}>
            <img className="nav-logo" alt="logo" width="60px" src={cobalt} />
            <Typography variant="h4" className={classes.header}>
              Cobalt lend
            </Typography>
          </Box>
        </Navbar.Brand>
        <Nav className="justify-content-end align-items-center ml-auto">
          {/* <Nav.Link href="#deets">
            <button className="navbtn tour" onClick={props.openTour}>
              Take A Tour
            </button>
          </Nav.Link>
          <Nav.Link href="#memes">
            {" "}
            <button className="cblt">
              <span>{20000 + " CBLT"}</span>
            </button>
          </Nav.Link> */}
          <Nav.Link href="#memes">
            {" "}
            <Button className={classes.button} color="primary" variant="outlined">
              Connect
            </Button>
          </Nav.Link>
          <NavDropdown
            className="navbtn settings mr-2"
            title="..."
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </header>
  )
}
