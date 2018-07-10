Welcome to Heady Repo
-------------------------------
Guidelines for how to run the app

1. Run `npm install`
2. `npm start`

Tasks need to be done:

1. Add a category -- `POST /api/categories`

```
{
    	"name" : "Fruits",
    	"type": "Organic",
    	"parentId" : "5b44962ae3f38f34cf5d1b0f"
}
```

2. Add Product mapped to a category or categories. -- `POST /api/products`

```
{
    	"name" : "Apple",
    	"price": "188",
    	"categoryId" : "5b44ce851bbe463ec5b31449"
}
```

3. Get all categories with all its child categories mapped to it. -- `GET /api/categories`

4. Get all products by a category -- `GET /api/categories/5b44962ae3f38f34cf5d1b0f/products`

5. Update product details (name,price,etc) -- `GET /api/products/5b44ce851bbe463ec5b31449/update`

```
{
	 "price": "187",
}
```

Note: You can find the route url in `routes/list.js`