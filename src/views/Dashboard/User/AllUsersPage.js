import { useReducer, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import Line from "./Line"
import Chart from "./Chart"
import NumberOfEx from "./NumberOfEx"
import { HiUserAdd, HiPencilAlt, HiPlus, HiSearch } from "react-icons/hi"
import { toast } from "react-toastify"
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
	return (
		<div>
			<Line />
			<NumberOfEx />
			<Chart />
		</div >
	)
}

export default AllUsersPage
