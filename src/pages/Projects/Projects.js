import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Message from "../../layouts/Message/Message"
import Container from '../../layouts/Container/Container'
import LinkButton from '../../layouts/LinkButton/LinkButton'
import ProjectCard from '../../components/project/ProjectCard/ProjectCard'
import Loading from '../../layouts/Loading/Loading'
import styles from './Projects.module.css'

function Projects() {
    const [projetcs, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState()
    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 3000);
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
            .then((data) => {
            console.log(data);
            setProjects(projetcs.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((err) => console.log(err))
    }

    return (
        <main className={ styles.project_container }>
            <div className={ styles.title_container }>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && ( <Message type="sucess" msg={ message } /> )}
            {projectMessage && ( <Message type="sucess" msg={ projectMessage } /> )}
            <Container customClass="start" >
                {projetcs.length > 0 && (
                    projetcs.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={ project.nome_do_projeto }
                            budget={ project.budget_do_projeto }
                            category={project.category.name}
                            handleRemove={ removeProject }
                            key={ project.id }
                        />
                    ))
                )}
                {removeLoading === false && (<Loading />)}
                {removeLoading === true && projetcs.length == 0 && (
                    <h2>Não há projetos cadastrados!</h2>
                )}
            </Container>
        </main>
    )
}

export default Projects