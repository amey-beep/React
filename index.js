const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');
const app=express();

app.use(cors());

const db=mysql.createPool(
    {
        host:"localhost",
        user:"root",
        password:"123456",
        database:"project",
    }
);

app.use(express.json());

app.put("/api/updateContact",(req,res)=>{
    const phone=req.body.oldphone;
    const newPhone=req.body.newphone;
    const sqlUpdate="UPDATE contact SET Phone_No=? WHERE Phone_No=?;";
    db.query(sqlUpdate,[newPhone,phone],(err,result)=>{
        if(err) console.log(err);
    });
});

app.delete("/api/delContact/:Phone_No",(req,res)=>{
    const phone=req.params.Phone_No;
    const sqlDelete="DELETE FROM contact where Phone_No = ?;";
    db.query(sqlDelete,phone,(err,result)=>{
       if(err) console.log(err);
    });
});

app.get("/api/show",(req,res)=>{
    const show="SELECT * FROM contact;";
    db.query(show,(err,result)=>{
        res.send(result);
    });
});

app.post("/api/addContact",(req,res) => {
    
    const userName=req.body.uN;
    const phoneNo=req.body.pN;

    const sqlInsert="INSERT INTO contact(Name,Phone_No) VALUES (?,?);";
    db.query(sqlInsert,[userName,phoneNo],(err,result)=>{
        if(err) console.log(err);
    });

    
});

const port=3001||process.env.PORT
app.listen(port,() => {
    console.log(`running on ${port}`);
});

