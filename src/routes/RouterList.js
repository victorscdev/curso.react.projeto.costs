import Company from '../pages/Company/Company'
import Contact from '../pages/Contact/Contact'
import Home from '../pages/Home/Home'
import NewProject from '../pages/NewProject/NewProject'
import Projects from '../pages/Projects/Projects'

const routerList = [
    {
        name: 'Empresa',
        path: '/company',
        component: Company,
    },
    {
        name: 'Contato',
        path: '/contact',
        component: Contact,
    },
    {
        name: 'Home',
        path: '/',
        component: Home,
    },
    {
        name: 'Novo Projeto',
        path: '/newproject',
        component: NewProject,
    },
    {
        name: 'Projetos',
        path: '/projects',
        component: Projects,
    },
]

const navList = [
    {
        name: 'Home',
        path: '/',
        component: Home,
    },
    {
        name: 'Projetos',
        path: '/projects',
        component: Projects,
    },
    {
        name: 'Empresa',
        path: '/company',
        component: Company,
    },
    {
        name: 'Contato',
        path: '/contact',
        component: Contact,
    },
]

const routesArr = [routerList, navList]

export default routesArr