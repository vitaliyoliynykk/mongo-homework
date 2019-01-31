const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

const articleController = require('../controllers/article');
const userController = require('../controllers/user');


router.post('/', (req, res) => {
	userController.User.findById(req.body.owner).then((user) => {
		if(!user) {
			return res.status(404).send();
		}
		articleController.createArticle({
			  title: req.body.title,
  		      subtitle: req.body.subtitle,
              description: req.body.description,
              owner: req.body.owner,
              createdAt: req.body.createdAt,
              updatedAt: req.body.updatedAt,
              cat: req.body.cat
		}).then((article) => {
			userController
			.User
			.findByIdAndUpdate(req.body.owner, {$inc: { numberOfArticles: 1}}, {new: true})
			.then((user) => {
				console.log(user)
			});
			res.status(200).send(article);
		}).catch((e) => {
			res.status(400).send(e);
		})
	});
});

router.put('/:articleid', (req, res) => {
	const id = req.params.articleid;

	if(!ObjectID.isValid(id)){
		res.status(404).send()
	}
	
	articleController
	.Article
	.findByIdAndUpdate(id, req.body, {new: true})
	.then((article) => {
		if(!article){
			res.status(404).send();
		}
		res.send({article});
	}).catch((e) => {
		console.log(e);
		res.status(400).send()
	});

});

router.get('/', (req, res) => {
	articleController
	.Article
	.find(req.body)
	.populate('owner')
	.then((articles) => {
		res.send(articles);
	}).catch((e) => {
		console.log(e);
		res.status(400).send()
	});
});

router.delete('/:articleid', (req, res) => {
	const id = req.params.articleid;

	if(!ObjectID.isValid(id)){
		res.status(404).send()
	}

	articleController
	.Article
	.findByIdAndRemove(id, (err, doc) => {
		if(err||!doc){
			return res.status(404).send();
		}
		userController
		.User
		.findByIdAndUpdate(doc.owner ,{$inc: { numberOfArticles: -1}},{new: true})
		.then((user) => {
			res.send(user);
		}).catch((e) => {
			console.log(e);
			res.status(400).send()
		});

	 });
});

module.exports = router;