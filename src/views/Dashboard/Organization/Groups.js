import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "./Dashboard.css"
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
import MainTask from "../../../Timer/components/MainTask";
import { useMemo, useRef } from 'react';
// import k from "../../../Timer/components/MainTask"
import { PomodoroProvider } from '../../../Timer/context/PomodoroContext';
import SaveButton from "../../../Timer/components/SaveButton"
import PomodoroGrid from '../../../Timer/components/PomodoroGrid';

const Groups = () => {

	const gridRef = useRef(null);

	const themes = useMemo(() => ({
	  pomodoro: {
		foreground: '#ffffff',
		background: '#d95550',
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
				<PomodoroGrid gridRef={gridRef} themes={themes} />
				<SaveButton gridRef={gridRef} />
			</PomodoroProvider>
		</div>
	)
}

export default Groups
