import { useState } from 'react';

import Input from '../../form/Input/Input';
import SubmitButton from '../../form/SubmitButton/SubmitButton';

import styles from '../../project/ProjectForm/ProjectForm.module.css';

function ServiceForm({ arrInputService, handleSubmit, btnText, projectData }) {
	const [service, setService] = useState({});

	function handleOnChange(event) {
		setService({ ...service, [event.target.name]: event.target.value });
	}

	function submit(event) {
		event.preventDefault();
		projectData.services.push(service);
		handleSubmit(projectData);
	}

	return (
		<form onSubmit={submit} className={styles.form}>
			{arrInputService.map((input, index) => (
				<Input
					key={index}
					type={input.type}
					text={input.text}
					name={input.name}
					placeholder={input.placeholder}
					handleOnChange={handleOnChange}
				/>
			))}
			<SubmitButton text={btnText} />
		</form>
	);
}

export default ServiceForm;
