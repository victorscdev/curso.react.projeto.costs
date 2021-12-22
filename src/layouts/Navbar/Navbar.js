import { Link } from 'react-router-dom'

import Container from '../Container/Container'
import styles from './Navbar.module.css'
import logo from '../../assets/img/costs_logo.png'

function Navbar({ routerList }) {
   

    return (
        <nav className={ styles.navbar }>
            <Container>
                <Link to="/">
                    <img src={ logo } alt="Logo Costs"/>
                </Link>
                <ul className={ styles.list }>
                    {routerList.map((route, index) => (
                        <li key={index} className={ styles.item }>
                            <Link to={ route.path }>{ route.name }</Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar