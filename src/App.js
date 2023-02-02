import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"
import PrivateRoutes from "./routes/PrivateRoutes"
import Profile from "./views/Auth/Profile"
import Login from "./views/Auth/Login"
import DashboardLayout from "./layouts/DashboardLayout"

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/Profile" element={<Profile />}></Route>
					<Route path="/login" element={<center className="m-14"><Login /></center>}></Route>
					{/* <Route path="/dashboard" element={<center className="m-14"><DashboardLayout /></center>}></Route> */}
				</Routes>
				<PrivateRoutes />
			</Router>
		</Provider>
	)
}

export default App
