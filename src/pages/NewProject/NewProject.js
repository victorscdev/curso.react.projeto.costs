import { useNavigate } from 'react-router-dom';
import ProjectForm from '../../components/project/ProjectForm/ProjectForm'
import styles from './NewProject.module.css'


function NewProject() {
    const navigate = useNavigate()

    function createPost(project) {
        project.cost = 0
        project.services = []

        fetch("https://61c9bbf520ac1c0017ed8dea.mockapi.io/costs/v1/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
            .then((data) => {
                navigate('/projects', { state: 'Projeto criado com sucesso!' })
        })
        .catch((err) => console.log(err))
    }

    return (
        <section className={ styles.newproject_container }>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={ createPost } btnText="Criar Projeto"/>
        </section>
    )
}

export default NewProject