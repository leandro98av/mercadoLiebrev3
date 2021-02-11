const fs = require('fs');

const products={

getProducts:()=>{
return JSON.parse(fs.readFileSync(__dirname + '/productsDataBase.json','utf-8'));
}, 
setProducts: (data) => {
    fs.writeFileSync(__dirname + '/productsDataBase.json',JSON.stringify(data,null,2),'utf-8');
}}

module.exports=products