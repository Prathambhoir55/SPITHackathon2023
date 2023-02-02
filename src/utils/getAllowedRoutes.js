import { intersection } from "lodash"

export function isArrayWithLength(arr) {
	return Array.isArray(arr) && arr.length
}

export function getAllowedRoutes(routes, role) {
	// const roles = JSON.parse(localStorage.getItem("roles"))
	return routes.filter(({ permissions }) => {
		// console.log("permission", permissions)
		// console.log("role", [role])
		// console.log("intersection", intersection(permissions, [role]))
		if (!permissions) return true
		else if (!isArrayWithLength(permissions)) return true
		else return intersection(permissions, [role]).length
	})
}
