const http = require('http');
const products = [
    { id: 1, name: 'Laptop', price: 76000, category: 'Electronices' },
    { id: 2, name: 'Smartphone', price: 76000, category: 'Electronices' },
    { id: 3, name: 'Tab', price: 76000, category: 'Electronices' },
    { id: 4, name: 'Watch', price: 76000, category: 'Electronices' },


];

const port = 5600;

//create server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const homedata = {
        status: 'success',
        message: 'this is home page',
        path: req.url,
    };
    const aboutdata = {
        status: 'success',
        message: 'this is about page',
        path: req.url,
    };
    const contactdata = {
        status: 'success',
        message: 'this is contact page',
        path: req.url,
    };
    const notfounddata = {
        status: 'error',
        message: '404 not found',
        path: req.url,
    };

    // multiple routing
    if (req.url === '/') {
        res.end(JSON.stringify(homedata));
    }
    else if (req.url === '/about') {
        res.end(JSON.stringify(aboutdata));
    }
    else if (req.url === '/contact') {
        res.end(JSON.stringify(contactdata));
    }
    //view all data
    else if (req.url === '/products') {
        res.end(JSON.stringify({
            status:'success',
            data:products
        }));
    }
    //singel view
    else if (req.url.startsWith('/product')) {

        const id = parseInt(req.url.split('/')[2]);
        const product = products.find(x=>x.id === id);
        res.end(JSON.stringify({
            status:'success',
            data:product
        }))
    }
    //insert
    else if (req.method === 'POST' && req.url ==='/add-product') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end',()=>{
            try {
                const newproduct = JSON.parse(body);
                if(newproduct.name && newproduct.price && newproduct.category){
                    newproduct.id = products.length +1;
                    products.push(newproduct);
                    res.end(JSON.stringify({
                        status:'success',
                        message:'product added',
                        data:newproduct
                    }))
                } else {
                    res.end(JSON.stringify({
                        status:'error',
                        message:'product not added',
                    
                    }))
                }
            } catch (err) {
              console.error(err);
            }
        })
       
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify(notfounddata));
    }
});
server.listen(port, () => {
    console.log('server running port 5600');
})