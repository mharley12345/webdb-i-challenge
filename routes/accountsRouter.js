const express = require('express')



const router = express.Router()

const knex = require('../data/dbConfig')

//get /accounts
router.get('/', (req,res) =>{
    // get the list of accounts from the db using knex
 knex('accounts')
    //  .select()
    //  .from('accounts')
    
  .then(accounts =>{
    res.status(200).json(accounts)
  })
    //send the list of accounts from the db
   .catch(error=>{
       res.status(500).json({message:error})
   })
})



//get acounts/id
router.get('/:id', (req,res)=>{
    // ID
 
knex('accounts')
//   .select()
//   .from('accounts')
  .where({id:req.params.id})
.first()
  .then(account =>{
      if (account)
      {res.status(200).json(account)}
      else{
          res.status(404).json({message: 'Account not found'})
      }
  })
  .catch(error =>{
      res.status(500).json({message:"This shit is broke"})
  })
})
//post accounts/add
router.post('/add' ,(req,res) =>{
    const accountData = req.body;
 knex 
    .insert(accountData,'id')
    .into('accounts')

    .then(accountID =>{
        res.status(200).json({data:accountID})
    })
    .catch(error => {
        res.status(500).json({message:error})
    })
})
//update accounts/:id
router.put("/:id", (req, res) => {
	
	// Account ID number
	const accountID = req.params.id;
	const updatedData = req.body;

	// Update Query
	knex('accounts')
		.where({id: accountID})
		.update(updatedData)
		.then( updatedAccount => res.status(200).json({data: updatedAccount}))
		.catch(err => res.status(500).json({message: "There was a issue with the DB", err: err}))
})

// Delete: accounts/:id - deletes a record from the database
router.delete("/:id", (req, res) => {

	// Account ID
	const accountID = req.params.id;

	knex('accounts')
	.where({id: accountID})
	.del()
	.then(response => res.status(200).json({data: response}))
	.catch(err => res.status(500).json({message: "There was a problem in the DB", err: err}))
})
module.exports=router