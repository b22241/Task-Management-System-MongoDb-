const express = require('express');
const app = express();
const path = require('path');
const userModel = require("./models/user");

app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Home Page
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Read All Users
app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render('read.ejs', { users });
});

app.get('/back',(req,res)=>{
    res.redirect('/')
})

// Create New User
app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect('/read');
});

// Delete User
app.get('/delete/:id', async (req, res) => {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect('/read');
});

// Edit User Page
app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findById(req.params.id);
    res.render('edit.ejs', { user });
});

// Update User
app.post('/update/:userid', async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.findByIdAndUpdate(req.params.userid, { name, email, image }, { new: true });
    res.redirect('/read');
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
