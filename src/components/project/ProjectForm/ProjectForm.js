import { useEffect, useState } from 'react'

import Input from '../../form/Input/Input'
import Select from '../../form/Select/Select'
import SubmitButton from '../../form/SubmitButton/SubmitButton'
import styles from './ProjectForm.module.css'


function ProjectForm({ handleSubmit, projectData, btnText }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    const submit = (event) => {
        event.preventDefault()
        handleSubmit(project)
        // console.log(project);
    }

    function handleChange(event) {
        setProject({ ...project, [event.target.name]: event.target.value })
    }

    function handleSelect(event) {
        setProject({
            ...project, category: {
                id: event.target.value,
                name: event.target.options[event.target.selectedIndex].text
        }})
    }

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((resp => resp.json()))
        .then((data) => setCategories(data))
        .catch((err) => console.log(err))
    }, [])

    return (
        <form onSubmit={ submit } className={ styles.form }>
            <Input
                name="nome_do_projeto"
                text="Nome do Projeto"
                type="text"
                placeholder="Insira o nome do projeto"
                value={ project.name }
                handleOnChange={handleChange}
            />

            <Input
                name="budget_do_projeto"
                text="Orçamento do projeto"
                type="number"
                placeholder='Insira o orçamento total'
                value={ project.budget }
                handleOnChange={handleChange}
            />

            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                value={ project.category ? project.category.id : '' }
                handleOnChange={handleSelect}
            />
            
            <SubmitButton text={ btnText }/>
        </form>
    )
}

export default ProjectForm