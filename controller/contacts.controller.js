const catchAsync = require("../utils/catchAsync");
const  contactService  = require("../service/contacts.service");
const contactServiceInstance=new contactService();

const identifyContact=catchAsync(async(req,res)=>{
    if(!req.email && !req.phoneNumber){
        
    }
    const contacts=await contactServiceInstance.findPrimaryContacts(req.body);
if(contacts.length===0){
await contactServiceInstance.addContact(req.body);
}else if(contacts.length===1){
    const secondaryCheck=await contactServiceInstance.checkSecondary(req.body);
    if(!secondaryCheck){
    const data={...req.body,
        linkPrecedence:"secondary",
        linkedId:contacts[0].id
    }
 await contactServiceInstance.addContact(data);}
}else{
    let primaryContact=contacts[0];
let secondaryContact=contacts[1];
    await contactServiceInstance.updateContact(secondaryContact.id, primaryContact.id);
}
const result= await contactServiceInstance.getAllContacts(req.body)
const response=contactServiceInstance.mapResults(result);
res.json(response);
    // const response={}
    // res.status(201).json(response);
})

module.exports={identifyContact};