import { useLocation } from 'react-router-dom'

import Message from "../../layouts/Message/Message"

function Projects() {
    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state
    }

    return (
        <main>
            <h1>Meus Projetos</h1>
            {message && (
                <Message type="sucess" msg={ message } />
            )}
        </main>
    )
}

export default Projects