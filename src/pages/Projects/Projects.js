import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Message from "../../layouts/Message/Message"
import Container from '../../layouts/Container/Container'
import LinkButton from '../../layouts/LinkButton/LinkButton'
import ProjectCard from '../../components/project/ProjectCard/ProjectCard'
import styles from './Projects.module.css'

function Projects() {
    const [ projetcs, setProjects ] = useState([])
    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state
    }

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                setProjects(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <main className={ styles.project_container }>
            <div className={ styles.title_container }>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && (
                <Message type="sucess" msg={ message } />
            )}
            <Container customClass="start" >
                {projetcs.length > 0 && (
                    projetcs.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={ project.nome_do_projeto }
                            budget={ project.budget_do_projeto }
                            category={project.category.name}
                            key={ project.id }
                        />
                    ))
                )}
            </Container>
        </main>
    )
}

export default Projects