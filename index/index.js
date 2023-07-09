const express = require('express');
const app = express();
const cors = require('cors');
app.options('*' , cors());
require('dotenv').config({path:"config.env"});
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/' , (req , res) => {
        res.send('Hello backend');
});

app.post('/paynow' , async(req , res) => {
        try {
                await stripe.charges.create({
                        amount:req.body.amount,
                        currency:"myr",
                        source:req.body.token.id
                });
        } catch (error) {
                console.log(error.message , error.code);
        }
})

const PORT = process.env.PORT || 8000;

app.listen(PORT , () => {
            console.log(`Backend is running at PORT:${PORT}`);
});