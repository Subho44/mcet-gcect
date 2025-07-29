const http = require('http');

const port = 5600;

//create server
const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'});
    const homedata = {
        status:'success',
        message:'this is home page',
        path:req.url,
    };
    const aboutdata = {
        status:'success',
        message:'this is about page',
        path:req.url,
    };
    const contactdata = {
        status:'success',
        message:'this is contact page',
        path:req.url,
    };
    const notfounddata = {
        status:'error',
        message:'404 not found',
        path:req.url,
    };
    
    // multiple routing
    if(req.url === '/'){
        res.end(JSON.stringify(homedata));
    }
    else if(req.url ==='/about'){
          res.end(JSON.stringify(aboutdata));
    }
    else if(req.url ==='/contact'){
          res.end(JSON.stringify(contactdata));
    }
    else {
        res.statusCode=  404;
        res.end(JSON.stringify(notfounddata));
    }
});
server.listen(port,()=>{
    console.log('server running port 5600');
})