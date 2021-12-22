import { Routes, Route } from 'react-router-dom'

function RouterView({ routerList }) {
    return (
        <Routes>
            {routerList.map((route, index) => (
                <Route
                    exact
                    key={ index }
                    path={route.path}
                    element={<route.component/>}
                />
            ))}
        </Routes>
    )
}

export default RouterView