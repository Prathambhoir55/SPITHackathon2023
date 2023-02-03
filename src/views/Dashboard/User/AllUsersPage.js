import { useReducer, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import Line from "./Line"
import Chart from "./Chart"
import NumberOfEx from "./NumberOfEx"
import PieChart from "../../Dashboard/AdminDashboard/components/Charts/PieChart"
import { HiUserAdd, HiPencilAlt, HiPlus, HiSearch } from "react-icons/hi"
import { toast } from "react-toastify"
import ChartCard from "../AdminDashboard/components/ChartCard"
import {
	toastReset,
	createEmployeeType,
} from "../../../store/slices/employee/employeeSlice"
import {
	allUsers,
	searchEmployee,
	toastReset as userToastReset,
} from "../../../store/slices/User/userSlice"
import {
	InputTag,
	Button,
	SectionHeader,
	Modal,
	AllUsersTable,
	LoadingSpinner,
	SubHeading,
	NoteText,
	RenderIf,
	FadedText,
} from "../../../components"

const initialEmployeeData = {
	newType: "",
}

const employeeReducer = (state, action) => {
	switch (action.type) {
		case "newType":
			return { ...state, newType: action.payload }
		case "reset":
			return {
				newType: "",
			}
		default:
			return state
	}
}

const AllUsersPage = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const [state, dispatch] = useReducer(employeeReducer, initialEmployeeData)
	const { isLoading, message, showToast, success } = useSelector(
		(state) => state.employee
	)
	const {
		isLoading: userIsLoading,
		users,
		employeeSearchResult,
		showToast: userShowToast,
		message: userMessage,
		success: userSuccess,
	} = useSelector((state) => state.user)
	const employeeDispatch = useDispatch()
	const navigate = useNavigate()

	const createEmployeeTypeHandler = (e) => {
		e.preventDefault()
		employeeDispatch(createEmployeeType({ name: state.newType }))
	}

	useEffect(() => {
		employeeDispatch(allUsers())
	}, [employeeDispatch])

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (searchTerm.length > 0) {
				employeeDispatch(searchEmployee(searchTerm))
			}
		}, 1000)
		return () => clearTimeout(timeout)
	}, [searchTerm, employeeDispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => employeeDispatch(toastReset())
	}, [showToast, message, employeeDispatch, success])

	useEffect(() => {
		if (userShowToast) {
			toast[userSuccess ? "success" : "error"](userMessage)
		}
		return () => employeeDispatch(userToastReset())
	}, [userShowToast, userMessage, employeeDispatch, userSuccess])

	if (isLoading || userIsLoading) {
		return <LoadingSpinner />
	}

	const Data = [

		{ gender: '0', count: 30 },
		{ gender: '1', count: 10 },
		{ gender: '2', count: 4 },
		{ gender: '3', count: 4 },
		{ gender: '4', count: 26 },
		{ gender: '5', count: 30 },
	]

	const Tone = [

		{ gender: '0', count: 5 },
		{ gender: '1', count: 15 },
		{ gender: '2', count: 23 },
	]
	return (
		<div>
			<Line />
			<NumberOfEx />
			<Chart />
			<div  className="grid grid-cols-2 sm:col-start-8 sm:col-end-11">
				<ChartCard title="Gestures">
					<PieChart labels={["One", "Two", "Three", "Four","Level","This/That"]}
						colors={["#FF7599", "#A9FF96", "#FFBC75", "#B7D3DF","#999EFF","orange"]}
						dataSet={Data}
						loading={isLoading} />
				</ChartCard>
				<ChartCard title="Tone">
					<PieChart labels={["Negative", "Positive", "Neutral"]}
						colors={["#FF7599", "#A9FF96", "#B7D3DF"]}
						dataSet={Tone}
						loading={isLoading} />
				</ChartCard>
			</div>

		</div >
	)
}

export default AllUsersPage
