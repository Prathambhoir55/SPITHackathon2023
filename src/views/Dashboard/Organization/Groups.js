import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "./Dashboard.css"
import { useMemo, useRef } from 'react';
import { PomodoroProvider } from '../../../Timer/context/PomodoroContext';
import SaveButton from '../../../Timer/components/SaveButton';
import MainTask from "../../../Timer/components/MainTask"
import PomodoroGrid from "../../../Timer/components/PomodoroGrid"
import {
	HiPlus,
	HiUserGroup,
	HiLockOpen,
	HiDocumentSearch,
} from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
// Toast <====
import { toast } from "react-toastify"
// ===>
import {
	Button,
	Modal,
	SectionHeader,
	InputTag,
	SubHeading,
	LoadingSpinner,
	CardSmall,
	TransitionBtoT,
} from "../../../components"
import {
	allPermissions,
	groupCreate,
	toastReset,
	allGroups,
} from "../../../store/slices/User/userSlice"

const Groups = () => {
	const gridRef = useRef(null);
	const { currentTheme, colors } = useSelector((state) => state.theme)
	console.log(currentTheme);
	console.log(colors);
	const themes = useMemo(() => ({
		pomodoro: {
			foreground: '#ffffff',
			background: currentTheme
				? colors.bg[currentTheme].dark
				: "purple",
		},
		short_break: {
			foreground: '#ffffff',
			background: '#1565c0',
		},
		long_break: {
			foreground: '#ffffff',
			background: '#ab47bc'

		},
		completed: {
			foreground: '#ffffff',
			background: '#4caf50'
		}
	}), []);

	return (
		<div>


			<PomodoroProvider>
				<MainTask themes={themes} />
				{/* <PomodoroGrid gridRef={gridRef} themes={themes} /> */}
				{/* <SaveButton gridRef={gridRef} /> */}
			</PomodoroProvider>
		</div>
	)
}

export default Groups



