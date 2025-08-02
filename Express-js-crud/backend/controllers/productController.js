let products = [];
let idcount = 1;

//insert
exports.createproduct = (req,res)=>{
    let data = req.body;
    //convert object to array
    if(!Array.isArray(data)){
        data = [data];
    }
    const newproduct = data.map(x => ({id: idcount++, ...x }));
    products.push(...newproduct);
    res.status(201).json(newproduct);
};
//view
exports.getproducts = (req,res)=>{
    res.status(200).json(products);
};

//singel view
exports.singleproduct = (req,res)=>{
    const product = products.find(x => x.id === parseInt(req.params.id));
    if(!product) return res.status(404).json({message:"product not found"});
    res.status(200).json(product);
};