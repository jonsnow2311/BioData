const Joi = require('joi');
const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  surname:{
    type: String,
    maxlength: 30
  },
  mobile:{
    type:Number,
    required: true,
  }
});

const contact = mongoose.model('Contact' , contactSchema);

function validateContact(contact)
{
  const schema = {
    name:Joi.string().min(5).required(),
    surname:Joi.string().min(3).required(),
    mobile:Joi.number().required()
  };

  return Joi.validate(contact , schema);
}

exports.contactSchema = contactSchema;
exports.contacts = contact;
exports.validate = validateContact;
