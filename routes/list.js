module.exports = [
	{method: "GET", path: "/api/categories", name: "Show Categories", controller: "api/category", action: "index"},
	{method: "POST", path: "/api/categories", name: "Create Categories", controller: "api/category", action: "create"},
	{method: "GET", path: "/api/categories/:categoryId", name: "Show Categories", controller: "api/category", action: "show"},
	{method: "GET", path: "/api/categories/:categoryId/products", name: "Show categorized products", controller: "api/category", action: "products"},
	{method: "POST", path: "/api/products", name: "Create Product", controller: "api/product", action: "create"},
	{method: "POST", path: "/api/products/:productId/update", name: "Update Product", controller: "api/product", action: "update"}
]