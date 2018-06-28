const express=require('express');
const router=express.Router();

const mysqlConnection=require('../database');

router.get('/',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employees',(err,rows,fields)=>{
        if(!err){
            // mostrar datos
            res.json(rows);
        }
        else{
            console.log(err);
        }
    })
})

router.get('/:id',(req,res)=>{
    // recibir id del trabjador
    const {id}=req.params;
    mysqlConnection.query('SELECT * FROM employees WHERE id=?',[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }
        else{
            console.log(err);
        }
    });
    
});

router.post('/',(req,res)=>{
    const { id,name,salary }=req.body;
    console.log(id);
   
    console.log(req.body);
    mysqlConnection.query('INSERT INTO employees SET id=?,name=?,salary=?',[id,name,salary],(err,rows,fields)=>{
        if(!err){
            res.json({Status:'Employeed saved'})
        }
        else{
            console.log(err);
        }
    });

})

router.put('/:id',(req,res)=>{
   const {name,salary}=req.body;
   const {id}=req.params;
   console.log(name);
   console.log(salary);
   console.log(id);

   mysqlConnection.query('UPDATE employees SET name=?,salary=? WHERE id=?',[name,salary,id],(err,rows,fields)=>{
    if(!err){
        res.json({Status:'Employeed updated'})
    }
    else{
        console.log(err);
    }
});

});

router.delete('/:id',(req,res)=>{
    
    const {id}=req.params;
    mysqlConnection.query('DELETE FROM employees WHERE id=?',[id],(err,rows,fields)=>{
     if(!err){
         res.json({Status:'Employeed eliminated'})
     }
     else{
         console.log(err);
     }
 });
 
 });

module.exports=router;