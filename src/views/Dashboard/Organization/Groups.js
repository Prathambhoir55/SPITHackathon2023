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

const Groups = () => {


	return (
		<div>
			<PowerBIEmbed
				embedConfig={{
					type: 'report',   // Supported types: report, dashboard, tile, visual and qna
					id: '4bcae524-40af-4d05-b40e-15ef1947fdb3',
					embedUrl: "https://app.powerbi.com/reportEmbed?reportId=4bcae524-40af-4d05-b40e-15ef1947fdb3&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
					accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDFmMTQzNDgtZjFiNS00YTA5LWFjOTktN2ViZjIxM2NiYzgxLyIsImlhdCI6MTY3NTM2NDM0MCwibmJmIjoxNjc1MzY0MzQwLCJleHAiOjE2NzUzNjg3NTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFrM29EYXdHUnZQZi9zbjNZQmdab1JhUFNpdmR3VHlOMXJRSi9EQ3p2M09IcFpRK2drSDlQdVJiR3VXbzlSdWIxIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTUFOR0UiLCJnaXZlbl9uYW1lIjoiQkhVTUlLQSIsImlwYWRkciI6IjIwMy4yMTIuMjUuNTEiLCJuYW1lIjoiQkhVTUlLQSBNQU5HRSAtIDYwMDA0MjAwMDY1Iiwib2lkIjoiZWIwYzJiODktZjNhOC00YWMzLTg3OGUtNjU1YWE0ZjU5NzgxIiwicHVpZCI6IjEwMDMyMDAxMTQ1NUZCQUQiLCJyaCI6IjAuQVQwQVNFUHgwYlh4Q1Vxc21YNl9JVHk4Z1FrQUFBQUFBQUFBd0FBQUFBQUFBQUE5QU5BLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Im40aURGSUJvemQ0Mmdxa3p4ckVQYllmR0ZLby03SmlKSXlhWnl3WWduN1UiLCJ0aWQiOiJkMWYxNDM0OC1mMWI1LTRhMDktYWM5OS03ZWJmMjEzY2JjODEiLCJ1bmlxdWVfbmFtZSI6IkJIVU1JS0EuTUFOR0U2NUBzdmttbXVtYmFpLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6IkJIVU1JS0EuTUFOR0U2NUBzdmttbXVtYmFpLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6Imx5VFZfNU4wQkV1a09meDlleS02QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.eihB7rSZYmL4SSQOTH49ZFP21TvYWz5-4ynPk090bip6fiKRxGvj2AuJvkLU5NnEg3XlVjrMb2qfMFoL2myIudn34IeQmcRYh_rKhPoi2jdjb3KwSfUq1jKZ82ZYd4H-WMcdaVroIKV-8lS67NbYKVnU7VlqGOvaGzZWJzaN3cTeJgwR6mRdClu8xiXib07zd93ipboqrc_AB7fzTfhRO6viYF0Ma9e7CshwngOj0leC1jTiKPk-FAzE51cdrYtCgWSb3TImTIbnETUIbEHYKMg17jQInpuo5XYWJZ3d5Us-9Tg61qnGG0ZHMsCSQ7n4iNwr1hETq3Do6JLW1309gw',
					tokenType: models.TokenType.Aad,
					settings: {
						panes: {
							filters: {
								expanded: false,
								visible: true
							}
						},
					}
				}}

				eventHandlers={
					new Map([
						['loaded', function () { console.log('Report loaded'); }],
						['rendered', function () { console.log('Report rendered'); }],
						['error', function (event) { console.log(event.detail); }]
					])
				}

				cssClassName={"Embed-container"}

				getEmbeddedComponent={(embeddedReport) => {
					window.report = embeddedReport;
				}}
			/>
		</div>
	)
}

export default Groups
