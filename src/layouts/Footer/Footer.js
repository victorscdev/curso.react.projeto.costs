import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

import styles from './Footer.module.css'

function Footer() {
    const icons = [
        {
            iconName: FaFacebook
        },
        {
            iconName: FaInstagram
        },
        {
            iconName: FaLinkedin
        },
    ]

    return (
        <footer className={ styles.footer }>
            <ul className={ styles.socialList }>
                {icons.map((icon, index) => (
                    <li key={index}>
                        <icon.iconName />
                    </li>
                ))}
            </ul>
            <p className={ styles.copy_right }>
                <span>Costs</span> &copy; 2021
            </p>
        </footer>
    )
}

export default Footer