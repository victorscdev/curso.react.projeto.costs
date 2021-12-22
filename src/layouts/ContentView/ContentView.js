import { BrowserRouter } from 'react-router-dom'
import RouterView from '../../routes/RouterView'
import routesArr from '../../routes/RouterList'

import NavBar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Container from '../Container/Container'

function ContentView() {
    return (
        <BrowserRouter>
            <NavBar routerList={routesArr[1]} />

            <Container customClass="min-height">
                <RouterView routerList={routesArr[0]} />
            </Container>

            <Footer />
        </BrowserRouter>
    );
}

export default ContentView;