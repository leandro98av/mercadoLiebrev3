const { getProducts, setProducts } = require('../data/products');
const products = getProducts();

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render("products", { products, toThousand, title: "Todos los productos" })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(product => {
			return product.id == req.params.productId
		});
		res.render("detail", { product, toThousand })
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},

	// Create -  Method to store
	store: (req, res) => {
		const { name, price, discount, category, description, image } = req.body;
		let lastId = 0;
		products.forEach(producto => {
			if (producto.id > lastId) {
				lastId = producto.id
			}
		});
		const id = lastId + 1;
		const newProduct = {
			id,
			name,
			price: +price,
			discount: +discount,
			category,
			description,
			image: image || "default-image.png"
		}
		products.push(newProduct);

		setProduts(products);

		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const { id } = req.params;

		const product = products.find(product => {
			return product.id === +id
		});
		res.render("product-edit-form", {
			product,
		})
	},
	
	// Update - Method to update
	update: (req, res) => {
		const { name, price, discount, category, description, image } = req.body;
		const{id}=req.params;


		const updatedProduct = {
			id:+id,
			name,
			price: +price,
			discount: +discount,
			category,
			description,
			image: image || "default-image.png"
		};

		products.forEach((product,index)=>{
			if (product.id === +id){
				products.splice(index,1,updatedProduct)
			}
		});
		setProducts(products);
		res.redirect(`/products/detail/${id}`)
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		const {id} =req.params;

		const productsFilter= products.filter((product)=> {
			return product.id !== +id;
		});
		setProducts(productsFilter);
		res.redirect('/');
	}
};

module.exports = controller;