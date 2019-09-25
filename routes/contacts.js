const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {contacts , validate} = require('../models/contacts');
const auth = require('../middleware/auth');

router.get('', auth ,async (req,res) => {
  const contact = await contacts
     .find()
     .sort('name')
     .select({name: 1,surname: 1 , mobile: 1,_id:0});

  res.send(contact);
});
router.post('' , auth ,async (req,res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error);

  let contact = new contacts({
    name: req.body.name,
    surname: req.body.surname,
    mobile: req.body.mobile});
  contact = await contact.save();
  res.send(contact);
});

router.put('/:id' ,auth , async (req,res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error);

  const contact = await contacts.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    surname: req.body.surname,
    mobile:req.body.mobile},{
      new: true
    });
  if(!contact) return res.status(404).send('The contact with the ID was not found.');

  res.send(contact);
});

router.get('/:id',auth , async (req, res) => {
  try {
    const contact = await contacts.findById(req.params.id);
    if(!contact) return res.status(404).send('The contact with the ID was not found.');
  } catch (e) {
    return res.send('The contact with the ID was not found.');
  }
  res.send(contact);
});

router.delete('/:id',auth , async (req, res) => {
  const contact = await contacts.findByIdAndRemove(req.params.id);
  if(!contact) return res.status(404).send('The contact with the ID was not found.');

  res.send(contact);
});


module.exports = router;
