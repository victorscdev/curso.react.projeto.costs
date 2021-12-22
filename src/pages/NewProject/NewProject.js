import ProjectForm from '../../components/project/ProjectForm/ProjectForm'
import styles from './NewProject.module.css'


function NewProject() {
    return (
        <section className={ styles.newproject_container }>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm />
        </section>
    )
}

export default NewProject