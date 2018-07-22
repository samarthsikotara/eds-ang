module.exports = [
	{method: "GET", path: "/api/students", name: "Show Students", controller: "api/students", action: "index"},
	{method: "POST", path: "/api/students", name: "Create Students", controller: "api/students", action: "create"},
	{method: "GET", path: "/api/tests", name: "Show Students' Tests", controller: "api/students", action: "tests"},
	{method: "POST", path: "/api/tests", name: "Create Tests", controller: "api/students", action: "test_create"},
	{method: "POST", path: "/api/users", name: "Create Users", controller: "api/users", action: "create"},
	{method: "POST", path: "/api/login", name: "login", controller: "api", action: "login"},
	{method: "POST", path: "/api/logout", name: "logout", controller: "api", action: "logout"}
]