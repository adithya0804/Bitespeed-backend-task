const  Contact  = require("../models/contact.model");

class ContactService {
 addContact=async(data)=>{
 await Contact.create(data);
 }
 findPrimaryContacts=async(data)=>{
   const contacts = await Contact.find({
      $or: [
        { email: data.email}, 
        { phoneNumber: data.phoneNumber },
      ],
      linkPrecedence: 'primary',
    });
    return contacts.sort((a,b)=>{
      return a.createdAt-b.createdAt;
    })
 }
 getAllContacts=async(data)=>{
   const contacts = await Contact.find({
      $or: [
        { email: data.email}, 
        { phoneNumber: data.phoneNumber }, 
      ],});
      return contacts.sort((a,b)=>{
         return a.createdAt-b.createdAt;
       })
 }
 mapResults=(contacts)=>{
   const primaryContact = contacts[0];
   const primaryContatctId = primaryContact.id;
   const primaryEmail = primaryContact.email;
   const primaryPhoneNumber = primaryContact.phoneNumber;
   const secondaryContacts = contacts.slice(1);
   const secondaryContactIds = secondaryContacts.length?secondaryContacts.map(contact => contact.id): null;
   const emailSet = new Set([primaryEmail, ...secondaryContacts?.map(contact => contact.email)]);
   const phoneNumberSet = new Set([primaryPhoneNumber, ...secondaryContacts?.map(contact => contact.phoneNumber)]);
   const emails = Array.from(emailSet);
   const phoneNumbers = Array.from(phoneNumberSet);
 
   return {
     contact: {
       primaryContatctId,
       emails,
       phoneNumbers,
       secondaryContactIds,
     },
   };

 }

 checkSecondary=async(data)=>{
   const contacts = await Contact.find({
      $and: [
        { email: data.email}, 
        { phoneNumber: data.phoneNumber },
      ],
    });
    return contacts.length?true:false;
 }

 updateContact=async(id, primaryId)=>{
  const contact=await Contact.findOne({id});
  contact.linkPrecedence="secondary";
  contact.linkedId=primaryId;
  contact.updatedAt=new Date();
  await contact.save();
 }
}

module.exports=ContactService;