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
					accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDFmMTQzNDgtZjFiNS00YTA5LWFjOTktN2ViZjIxM2NiYzgxLyIsImlhdCI6MTY3NTQwNzA4NiwibmJmIjoxNjc1NDA3MDg2LCJleHAiOjE2NzU0MTIyMjYsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFMNW1GTGh3ckY1R01VU2VON3RGTXdjYnBIamFyTW9kTWpiaE1ZdUJwYW5IQXAzQjNxb2NRcVZscGFoYjUxVDdmIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTUFOR0UiLCJnaXZlbl9uYW1lIjoiQkhVTUlLQSIsImlwYWRkciI6IjEwMy4yNDYuMjI0LjE2NiIsIm5hbWUiOiJCSFVNSUtBIE1BTkdFIC0gNjAwMDQyMDAwNjUiLCJvaWQiOiJlYjBjMmI4OS1mM2E4LTRhYzMtODc4ZS02NTVhYTRmNTk3ODEiLCJwdWlkIjoiMTAwMzIwMDExNDU1RkJBRCIsInJoIjoiMC5BVDBBU0VQeDBiWHhDVXFzbVg2X0lUeThnUWtBQUFBQUFBQUF3QUFBQUFBQUFBQTlBTkEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoibjRpREZJQm96ZDQyZ3FrenhyRVBiWWZHRktvLTdKaUpJeWFaeXdZZ243VSIsInRpZCI6ImQxZjE0MzQ4LWYxYjUtNGEwOS1hYzk5LTdlYmYyMTNjYmM4MSIsInVuaXF1ZV9uYW1lIjoiQkhVTUlLQS5NQU5HRTY1QHN2a21tdW1iYWkub25taWNyb3NvZnQuY29tIiwidXBuIjoiQkhVTUlLQS5NQU5HRTY1QHN2a21tdW1iYWkub25taWNyb3NvZnQuY29tIiwidXRpIjoiSGNla0ExTXlWME9TRUJKcEtJOVZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.i1665hGK6ngnPiJPwx8WNgQpHXdsNdPnSRmPCPBnR5EgkVcwZYxYzH0cHdfhjYSieqjBbEjfhU-P6biXhAOkMKzp0evCNFQ5vDLkINjZoS4JsXLdln2olfbgGHZmp-AFpK5m6E2NEcKffJsP61C087lUQ7THp1xTa8w0zJZhIWKH3iylm-Krst7QAwqhccUq7_tYl945OwqNBH4_r510dNaJigxdiUB50hxgoUvEs8OGi6Cgym3luUL-2FbQyfXiv6KFYyrGCDvQgbfSj3705WluknMNOJKdqk0L4U50KLVXtZOFr4hUrmuuPCfdz01Y_OqRWUkpdAj33TkTfLLe-g',
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
