// mail is sent using the data in database booknest

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const mysql = require('mysql');
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'booknest',
});

 app.post("/testing",(req,res) => {
    const {name,email,password,contact,address,pincode} = req.body;

    const sql= `insert into register(name,email,password,contact,address,pincode) values ('${name}','${email}','${password}','${contact}','${address}','${pincode}')`;
    
   conn.query(sql,(err,result) => {
        if(err){
            console.error('Insert failed:',err);
            return res.status(500).send("Database error")
        }
        else{

            const transportobject = nodemailer.createTransport({
             service:'gmail',
             auth:{user:'sreeshna04@gmail.com' ,pass:"dehf wdwv bvkd zzud"}
        }) 
    
    const option ={
        from:"sreeshna04@gmail.com",
        to:email,
        subject:"Credentials of BookNest📚",
        text: `Dear ${name},\n\nWelcome to BookNest!\nYour account has been created successfully.\nYour Account Credentials are:\n username:${email} password:${password}\nEnjoy exploring books.\n\nBest regards,\nBookNest Team`,
        
    }
    transportobject.sendMail(option,(err,info) =>{
    if(err)
    {
        console.log('failed to send mail');
    }
    else
    {
        console.log("Your mail is sent successfully");
    }
})
    

 res.send("RECORDED and Send mail");
        }
       
    })
});



app.post("/login", (req, res) => {
  const data = req.body;

  // Use lowercase keys (frontend sends 'email', not 'Email')
  const email = data.email;
  const password = data.password;

  // SQL injection-safe version using placeholders (recommended)
  const sql = "SELECT password FROM register WHERE email = ?";

  conn.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Login failed");
    }

    // No user found
    if (result.length === 0) {
      return res.status(401).send("Invalid email");
    }

    // Check password (plain text match for now — later you should hash it)
    const storedPassword = result[0].password;
    if (storedPassword !== password) {
      return res.status(401).send("Incorrect password");
    }

    // If everything is okay
    res.send("Login Successful");
  });
});



app.post("/forgot-password", (req, res) => {
  const data = req.body;
  const sql =`select name,password from register where email='${data.email}'`;
  //console.log(sql);

  const transport = nodemailer.createTransport({
             service:'gmail',
             auth:{user:'sreeshna04@gmail.com' ,pass:"dehf wdwv bvkd zzud"}
        }) 
  conn.query(sql, (err, result) => {
    console.log(result[0]);
    if (err) {
      //console.log(err);
      res.send("Email Verification Failed");
    }
    else{  
      const option={
          from:"sreeshna04@gmail.com",
          to:data.email,
          subject:"Password Recovery",
          text:`Dear '${result[0].name}', \n Your Password is : '${result[0].password}'`,
      }
   console.log(result[0].password);
         transport.sendMail(option,(err,info)=>{
          if(err){
            console.log("Failed to send")
          }
         res.send("An email has been sent to you with your credentials");
        })

    }

  });
});


app.post('/booklist', (req, res) => {
  const { category } = req.body;

  const sql = `
    SELECT * 
      FROM booksinfo 
     WHERE genre = ? 
        OR sub_genre = ?
  `;

  conn.query(sql, [category, category], (err, result) => {
    if (err) {
      console.error('DB error at /booklist:', err);
      return res.status(500).send('Database error');
    }
    console.log('Query result:', result);
    res.json(result);
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});