const express = require('express'),
	router = express.Router(),
	Poll = require('../models/polls');
(Option = require('../models/option')), (middleware = require('../middleware'));

router.get('/', (req, res) => {
	Poll.find({ isPrivate: false })
		.then(allpolls => {
			res.render('polls/index', { polls: allpolls });
		})
		.catch(err => console.log(err));
});
router.get('/new', middleware.isLoggedIn, (req, res) => {
	res.render('polls/new');
});
router.post('/', middleware.isLoggedIn, (req, res) => {
	const newPoll = {
		question: req.body.question,
		author: { id: req.user._id, username: req.user.username }
	};

	Poll.create(newPoll)
		.then(newly => {
			if (req.body.p == 'false') {
				newly.isPrivate = true;
			} else {
				newly.isPrivate = false;
			}
			newly.save();
			Object.values(req.body.option).forEach(option => {
				Option.create({ text: option })
					.then(newoption => {
						Poll.findOneAndUpdate(
							{ _id: newly._id },
							{ $push: { options: newoption } }
						)
							.then()
							.catch(err => console.log(err));
					})
					.catch(err => {
						console.log(err);
					});
			});
			res.redirect('/users/' + req.user._id);
		})
		.catch(err => {
			console.log(err);
		});
});

router.get('/:id', middleware.isLoggedIn, (req, res) => {
	Poll.findOne({ _id: req.params.id })
		.populate('options')
		.then(foundpoll => {
			res.render('polls/show', { poll: foundpoll });
		})
		.catch(err => console.log(err));
});
router.post('/:id', middleware.isLoggedIn, (req, res) => {
	Poll.findOneAndUpdate(
		{ _id: req.params.id },
		{ $push: { votedUsers: req.user } }
	)
		.populate('options')
		.then(foundPoll => {
			Option.findOne({ _id: req.body.onlyone })
				.then(foundOption => {
					foundOption.votes += 1;
					foundOption.save();
				})
				.catch(err => {
					console.log(err);
				});
			res.redirect('/polls/' + req.params.id);
		})
		.catch(err => console.log(err));
});
router.delete('/:id', middleware.checkPollOwnership, (req, res) => {
	Poll.findOneAndDelete({ _id: req.params.id })
		.then(f => {
			return res.redirect('/users/' + req.user._id);
		})
		.catch(err => {
			throw err;
		});
});

module.exports = router;
