const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4:uuidv4} = require("uuid");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

let posts = [
    {
        id:uuidv4(),
        user:"Naveen",
        content:"coding"
    },
    {
        id:uuidv4(),
        user:"Sharath",
        content:"drawing"
    },
    {
        id:uuidv4(),
        user:"Hruthik",
        content:"Stand-up comedy"
    }
];


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.post("/posts",(req,res)=>{
    let {user,content} = req.body;
    let {id} = uuidv4();
    posts.push({id,user,content});
    // res.send(`Welcome ${user} your content ${content} is posted...`);
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let{id} = req.params;
    let post = posts.find((p)=>id==p.id);
    // res.render("show.ejs",{post});
    res.send(`You wish to view id ${id}`);
});


app.listen(port,()=>{
    console.log("App listening on port ",port);
});