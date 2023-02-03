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
					accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDFmMTQzNDgtZjFiNS00YTA5LWFjOTktN2ViZjIxM2NiYzgxLyIsImlhdCI6MTY3NTM5NTM1MCwibmJmIjoxNjc1Mzk1MzUwLCJleHAiOjE2NzU0MDAyMzUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUEzL2VUM1VNaHZ1V2tXOXRYeGZlQ3MvVHE3bngydU1sUTFXT3NjZWdYU0xQSVN2SGhZcnQ1cFlMTXlGbkhrRDV4IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTUFOR0UiLCJnaXZlbl9uYW1lIjoiQkhVTUlLQSIsImlwYWRkciI6IjIwMy4yMTIuMjUuNTEiLCJuYW1lIjoiQkhVTUlLQSBNQU5HRSAtIDYwMDA0MjAwMDY1Iiwib2lkIjoiZWIwYzJiODktZjNhOC00YWMzLTg3OGUtNjU1YWE0ZjU5NzgxIiwicHVpZCI6IjEwMDMyMDAxMTQ1NUZCQUQiLCJyaCI6IjAuQVQwQVNFUHgwYlh4Q1Vxc21YNl9JVHk4Z1FrQUFBQUFBQUFBd0FBQUFBQUFBQUE5QU5BLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Im40aURGSUJvemQ0Mmdxa3p4ckVQYllmR0ZLby03SmlKSXlhWnl3WWduN1UiLCJ0aWQiOiJkMWYxNDM0OC1mMWI1LTRhMDktYWM5OS03ZWJmMjEzY2JjODEiLCJ1bmlxdWVfbmFtZSI6IkJIVU1JS0EuTUFOR0U2NUBzdmttbXVtYmFpLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6IkJIVU1JS0EuTUFOR0U2NUBzdmttbXVtYmFpLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6ImJPdmpyYWRadkVLR2xlNllvc1lNQVEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.osokXsymf3VEp0TVXPnJNKC4hhDMAU6LFfJT1z1hR2kX14J7wtxneIOjceHyTf9lguZIo0A6UXfD_S8Tce5p8RywP2BEI3W-mSpuAwE_XRHsNmI7FpfBENUeOeuWJ6ze5koRtPSgC3dNQrbL8G6UaRahhOcvknaBXt4tdEALXDcF1u3c4kkENR4QjQTcHzEDb7p-p-AyRhLYDqWi7gH19nctjZsMTpdaRU4zhl6dfydrq8Js1Pn7XsYfGPfut2uDkKrbGB8qGJHPp3tAFqKtYpqX5TTV-RFT4uzib5-zNGGVDRtR0nPvuRn57cJnfxG7ndfaZSjklxxx_A7URVbEXg',
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
