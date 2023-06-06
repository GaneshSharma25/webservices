const express = require("express");
const router = express.Router();
const connection = require("../db/dbconnect");

router.get("/employees",(req,resp)=>{
    connection.query("select * from employees",(err,result)=>{
        if(err){
            resp.status(500).send("data not found.."+JSON.stringify(err));
        }else{
            resp.send(result);
        }
    })
})

//to get get specific employee by empid..
router.get("/employees/employee/:empid",(req,resp)=>{
   // console.log("inside employees/employee/:empid ")
    connection.query("select * from employees where empid = ?",[req.params.empid],(err,result)=>{
        if(err){
            resp.status(500).send("data not found"+JSON.stringify(err))
        }else{
            resp.send(result[0]);
        }
    })
})

//insert employee record into database..
router.post("/employees/employee/",(req,resp)=>{
    var empid = req.body.empid;
    var ename = req.body.ename;
    var sal = req.body.sal;

    connection.query("insert into employees value (?,?,?)",[empid,ename,sal],(err,result)=>{
        console.log(result);
        if(err){
            resp.status(500).send("data not inserted..");
        }else{
            if(result.affectedRows>0){
                resp.send("{'msg':'inserted successfully'}")
            }else{
                resp.send("{'msg':'not inserted'}")
            }
        }
    })
})

//update employee record..
router.put("/employees/employee/:eid",(req,resp)=>{
    var empid = req.body.empid;
    var ename = req.body.ename;
    var sal = req.body.sal;

    connection.query("update employees set ename = ?, sal = ? where empid = ?",[ename,sal,empid],(err,result)=>{
        console.log(result);
        if(err){
            resp.status(500).send("data not updated")
        }else{
            if(result.affectedRows>0){
                resp.send("{'msg':'updated succesfully'}")
            }else{
                resp.send("{'msg':'not updated'}")
            }
        }
    })
})

router.delete("/employees/employee/:eid",(req,resp)=>{
    connection.query("delete from employees where empid = ?",[req.params.eid],(err,result)=>{
        console.log(result);
        if(err){
            resp.status(500).send("data not deleted..")
        }else{
            if(result.affectedRows>0){
                resp.send("{'msg':'deleted successfully'}")
            }else{
                resp.send("{'msg':'not deleted'}")
            }
        }
    })
})
module.exports = router;