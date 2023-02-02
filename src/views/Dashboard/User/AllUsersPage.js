import { useReducer, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router"

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
			<SectionHeader text="Register a new employee or view all employees">
				<Button onClick={() => navigate("register-employee")} Icon={HiUserAdd}>
					Register
				</Button>
				<Modal
					title="Add new employee type"
					activator={({ setShow }) => (
						<Button Icon={HiUserAdd} onClick={() => setShow(true)}>
							Add employee type
						</Button>
					)}
				>
					<form onSubmit={createEmployeeTypeHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Add Employee Type"
							type="text"
							placeholder="Enter employee type"
							value={state?.newType}
							onChange={(e) =>
								dispatch({ type: "newType", payload: e.target.value })
							}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</Modal>
			</SectionHeader>

			{/* Search bar */}
			<form className="md:flex flex-row flex-wrap items-center my-2 max-w-md">
				<div className="relative flex w-full flex-wrap items-stretch">
					<span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
						<HiSearch className="fas fa-search dark:text-slate-400 text-slate-600"></HiSearch>
					</span>
					<input
						value={searchTerm || ""}
						onChange={(e) => setSearchTerm(e.target.value)}
						type="search"
						placeholder="Search employees"
						className="border borderColor px-3 py-2 placeholder-slate-500 dark:text-slate-200 text-slate-700 relative  dark:customPurpleBg_2   rounded text-sm outline-none focus:outline-none w-full pl-10"
					/>
				</div>
			</form>

			{/* All user */}
			<RenderIf
				isTrue={
					users && users.length > 0 && !searchTerm && searchTerm?.length < 1
				}
			>
				<SubHeading>All employees</SubHeading>
				<NoteText>
					Click on employee name to view/modify their user permission and groups
				</NoteText>
				<AllUsersTable
					content={users}
					rowsPerPage={8}
					baseUrl="employee-details/"
				/>
			</RenderIf>

			{/* Search result */}
			<RenderIf
				isTrue={
					employeeSearchResult &&
					employeeSearchResult.length > 0 &&
					searchTerm?.length > 0
				}
			>
				<SubHeading>Search result</SubHeading>
				<AllUsersTable
					content={employeeSearchResult}
					rowsPerPage={5}
					baseUrl="employee-details/"
				/>
			</RenderIf>
			<RenderIf
				isTrue={
					employeeSearchResult &&
					employeeSearchResult.length < 1 &&
					searchTerm?.length > 0
				}
			>
				<FadedText>Found nothing</FadedText>
			</RenderIf>
		</div>
	)
}

export default AllUsersPage
