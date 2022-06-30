import { Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';
import { SearchBar } from './SearchBar';


export function NavBar({on_click}) {

  return (<>
    <Navbar bg="light" expand="lg" className="position-relative" style={{zIndex:2}}>
      <Container fluid>
        <Navbar.Brand href="/">LOGO</Navbar.Brand>
        {/* rwd 時的漢堡按鈕 */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
         
          <SearchBar on_click={on_click}></SearchBar>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>);
}