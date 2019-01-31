const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

const userController = require('../controllers/user');
const articleController = require('../controllers/article');


router.post('/', (req, res) => {
	userController.createUser({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		role: req.body.role,
		createdAt: req.body.createdAt,
		numberOfArticles: req.body.numberOfArticle,
		nickname: req.body.nickname
	}).then( (user) => {
		res.status(200).send(user);
	}).catch((e) => {
		console.log(e);
		res.status(400).send()
	});
});

router.put('/:userid', (req, res) => {
	const id = req.params.userid;

	if(!ObjectID.isValid(id)){
		res.status(404).send()
	}

	userController.User
	.findByIdAndUpdate(id, req.body, {new: true})
	.then((user) => {
		res.send({user});
	}).catch((e) => {
		console.log(e);
		res.status(400).send()
	});

});

router.get('/:userid', (req, res) => {
	const id = req.params.userid;

	if(!ObjectID.isValid(id)){
		res.status(404).send()
	}
	userController.User.findById(id).then((user) => {
		if(!user){
			res.status(404).send();
		}
		articleController.Article.find({owner: id}).then((articles) => {
			res.send({user,articles})
		});
		
	}).catch((e) => {
		console.log(e);
		res.status(400).send()
	});
});

router.delete('/:userid', (req, res) => {
	const id = req.params.userid;

	if(!ObjectID.isValid(id)){
		res.status(404).send()
	}
	userController
	.User
	.findByIdAndRemove(id)
	.then((err, doc) =>{
		if(err||!doc){
			return res.status(404).send();
		}
	}).catch((e) => {
		console.log(e);
		res.status(400).send()
	});
	articleController
	.Article
	.remove({owner: id}, (err, data) => {
		if(err){
			console.log(err);
		}
		res.send(data);
	});

});

router.get('/:userid/articles', (req, res) => {
	const id = req.params.userid;

	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}
	articleController.Article.find({owner: id}).then((articles) => {
			res.send(articles);
		}).catch((e) => {
			res.status(400).send()
		});
});

module.exports = router;

