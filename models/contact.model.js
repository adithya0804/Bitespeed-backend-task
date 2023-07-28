const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1 },
})
const Counter = mongoose.model('Counter', counterSchema);

const contactSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
  phoneNumber: {
    type: String,
    maxlength: 25,
  },
  email: {
    type: String,
    maxlength: 25,
  },
  linkedId: {
    type: Number,
  },
  linkPrecedence: {
    type: String,
    enum: ['secondary', 'primary'],
    default:"primary",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

async function getNextId(sequenceName) {
    const counter = await Counter.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
  
    return counter.seq;
  }
  
  contactSchema.pre('save', async function (next) {
    if (this.isNew) {
      this.id = await getNextId('contactId');
    }
    next();
  });

const Contacts = mongoose.model('contacts', contactSchema);

module.exports = Contacts;
