const express = require('express');
const router = express.Router();
const EmployeeModel = require('../model/employee')

router.post('/add',(req,res)=>{
    const employee = new EmployeeModel(req.body)
    employee.save().then(result =>{
        res.status(201).json(
            employee
        )
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/retrieve',(req,res)=>{
    EmployeeModel.find().then(employee => {
        res.json(employee);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.put('/update',(req,res)=>{
    EmployeeModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
    .then(employee => {
        if(!employee){
            return res.status(400).json({
                message: 'Employee not found'
            });
        }
        res.json(employee);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/delete/:id',(req,res)=>{
    EmployeeModel.findByIdAndDelete(req.params.id)
    .then(employee => {
        if(!employee){
            return res.status(400).json({
                message: 'Employee not found'
            });
        }
        res.json({
            message: 'Employee was successfully deleted!'
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;