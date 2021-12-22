import styles from './Home.module.css'

import LinkButton from '../../layouts/LinkButton/LinkButton'

import savings from '../../assets/img/savings.svg'

function Home() {
    return (
        <section className={ styles.home_container }>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a genciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={ savings } alt="Costs"/>
        </section>
    )
}

export default Home