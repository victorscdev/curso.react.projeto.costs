import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parse, v4 as uuidv4 } from 'uuid';
import ProjectForm from '../../components/project/ProjectForm/ProjectForm';
import ServiceForm from '../../components/service/ServiceForm/ServiceForm';
import ServiceCard from '../../components/service/ServiceCard/ServiceCard';
import Message from '../../layouts/Message/Message';
import Container from '../../layouts/Container/Container';
import Loading from '../../layouts/Loading/Loading';
import styles from './Project.module.css';

function Project() {
	const { id } = useParams();
	const [project, setProject] = useState([]);
	const [services, setServices] = useState([]);
	const [removeLoading, setRemoveLoading] = useState(false);
	const [showProjectForm, setShowProjectForm] = useState(false);
	const [showServiceForm, setShowServiceForm] = useState(false);
	const [message, setMessage] = useState();
	const [type, setType] = useState();

	let arrInputService = [
		{
			type: 'text',
			text: 'Nome do serviço',
			name: 'name',
			placeholder: 'Insira o nome do serviço',
		},
		{
			type: 'number',
			text: 'Custo do serviço',
			name: 'cost',
			placeholder: 'Insira o valor total',
		},
		{
			type: 'text',
			text: 'Descrição do serviço',
			name: 'description',
			placeholder: 'Descreva o serviço',
		},
	];

	useEffect(() => {
		setTimeout(() => {
			fetch(
				`https://61c9bbf520ac1c0017ed8dea.mockapi.io/costs/v1/projects/${id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
				.then((resp) => resp.json())
				.then((data) => {
					setProject(data);
					setServices(data.services);
					setRemoveLoading(true);
				})
				.catch((err) => console.log(err));
		}, 1500);
	}, [id]);

	function toggleProjectForm() {
		setShowProjectForm(!showProjectForm);
	}

	function toggleServiceForm() {
		setShowServiceForm(!showServiceForm);
	}

	function editPost(project) {
		setMessage('');
		setType('');
		// budget validation
		if (project.budget_do_projeto < project.cost) {
			setMessage('O orçamento não pode ser menor que o custo do projeto!');
			setType('error');
			return false;
		}

		fetch(
			`https://61c9bbf520ac1c0017ed8dea.mockapi.io/costs/v1/projects/${project.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(project),
			},
		)
			.then((resp) => resp.json())
			.then((data) => {
				setProject(data);
				setShowProjectForm(false);
				setMessage('Projeto atualizado!');
				setType('sucess');
			})
			.catch((err) => console.log(err));
	}

	function createService(project) {
		setMessage('');
		setType('');

		const lastService = project.services[project.services.length - 1];
		lastService.id = uuidv4();

		const lastServiceCost = lastService.cost;
		const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

		if (newCost > parseFloat(project.budget_do_projeto)) {
			setMessage('Orçamento ultrapassado, verifique o valor do serviço');
			setType('error');
			project.services.pop();
			return false;
		}

		// add service cost to project total cost
		project.cost = newCost;

		// update project
		fetch(
			`https://61c9bbf520ac1c0017ed8dea.mockapi.io/costs/v1/projects/${project.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(project),
			},
		)
			.then((resp) => resp.json())
			.then((data) => {
				setServices(data.services);
				setShowServiceForm(false);
			})
			.catch((err) => console.log(err));
	}

	function removeService(id, cost) {
		setMessage('');
		setType('');

		const serviceUpdated = project.services.filter(
			(service) => service.id !== id,
		);

		const projectUpdated = project;
		projectUpdated.services = serviceUpdated;
		projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

		fetch(
			`https://61c9bbf520ac1c0017ed8dea.mockapi.io/costs/v1/projects/${projectUpdated.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(projectUpdated),
			},
		)
			.then((resp) => resp.json())
			.then(() => {
				setProject(projectUpdated);
				setServices(serviceUpdated);
				setMessage('Serviço removido com sucesso!');
				setType('sucess');
			})
			.catch((err) => console.log(err));
	}

	console.log(services);
	return (
		<div className={styles.project_details}>
			<Container customClass="column">
				{message && <Message type={type} msg={message} />}
				{removeLoading === false && <Loading />}
				{removeLoading === true && project.nome_do_projeto && (
					<>
						<div className={styles.details_container}>
							<h1>{project.nome_do_projeto}</h1>
							<button className={styles.btn} onClick={toggleProjectForm}>
								{showProjectForm === false && 'Editar Projeto'}
								{showProjectForm === true && 'Fechar'}
							</button>
							{showProjectForm === false && (
								<div className={styles.project_info}>
									<p>
										<span>Categoria:</span> {project.category.name}
									</p>
									<p>
										<span>Total de Orçamento:</span> R$
										{project.budget_do_projeto}
									</p>
									<p>
										<span>Total Utilizado:</span> R${project.cost}
									</p>
								</div>
							)}
							{showProjectForm === true && (
								<div className={styles.project_info}>
									<ProjectForm
										handleSubmit={editPost}
										btnText="Concluir edção"
										projectData={project}
									/>
								</div>
							)}
						</div>
						<div className={styles.service_form_container}>
							<h2>Adicione um serviço</h2>
							<button className={styles.btn} onClick={toggleServiceForm}>
								{showServiceForm === false && 'Adicionar serviço'}
								{showServiceForm === true && 'Fechar'}
							</button>
							<div className={styles.project_info}>
								{showServiceForm === true && (
									<ServiceForm
										arrInputService={arrInputService}
										handleSubmit={createService}
										btnText="Adicionar Serviço"
										projectData={project}
									/>
								)}
							</div>
						</div>
						<h2>Serviços</h2>
						<Container customClass="start">
							{services.length > 0 &&
								services.map((service) => (
									<ServiceCard
										key={service.id}
										id={service.id}
										name={service.name}
										cost={service.cost}
										description={service.description}
										handleRemove={removeService}
									/>
								))}
							{services.length === 0 && <p>Não há serviços cadastrados!</p>}
						</Container>
					</>
				)}
			</Container>
		</div>
	);
}

export default Project;
