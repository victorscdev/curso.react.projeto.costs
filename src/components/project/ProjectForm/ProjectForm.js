import Input from '../../form/Input/Input'
import Select from '../../form/Select/Select'
import SubmitButton from '../../form/SubmitButton/SubmitButton'
import styles from './ProjectForm.module.css'


function ProjectForm({ btnText }) {
    return (
        <form className={ styles.form }>
            <Input name="nome_do_projeto" text="Nome do Projeto" type="text" placeholder="Insira o nome do projeto" />

            <Input name="budget_do_projeto" text="Orçamento do projeto" type="number" placeholder='Insira o orçamento total' />

            <Select name="category_id" text="Selecione a categoria" />
            
            <SubmitButton text={ btnText }/>
        </form>
    )
}

export default ProjectForm