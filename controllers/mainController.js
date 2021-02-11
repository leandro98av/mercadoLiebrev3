const {getProducts} = require ('../data/products')
const products= getProducts();

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		const saleProducts = products.filter((product) =>{
            return product.category === 'in-sala'
        });
        const visitedProducts =products.filter((product) =>{
            return product.category === 'visited'
        });
		res.render("index", {saleProducts,visitedProducts,toThousand})
	},
	search: (req, res) => {
		const {search} = req.query;
		const productsFilter = products.filter((product) =>{
            return product.name.toLowerCase().includes(search.toLowerCase());
});
		res.render("results", {
			search,
			products:productsFilter,
			toThousand,
			});
	}, 
};

module.exports = controller;