const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	User = require('../models/user'),
	middleware = require('../middleware/index'),
	Polls = require('../models/polls');

router.get('/', function(req, res) {
	res.render('landing');
});

router.get('/register', (req, res) => {
	res.render('auth/register');
});
router.post('/register', function(req, res) {
	let newUser = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	});

	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, function() {
			req.flash('success', 'Welcome to YelpCamp ' + user.username);
			res.redirect('/polls');
		});
	});
});
router.get('/login', (req, res) => {
	res.render('auth/login');
});
router.post(
	'/login',
	passport.authenticate('local', {
		successReturnToOrRedirect: '/polls',
		failureRedirect: '/login'
	}),
	(req, res) => {}
);

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'Logged you out');
	res.redirect('/polls');
});

router.get('/users/:id', function(req, res) {
	User.findOne({ _id: req.params.id })
		.then(foundUser => {
			Polls.find()
				.where('author.id')
				.equals(foundUser._id)
				.then(polls => {
					res.render('dashboard', { user: foundUser, Polls: polls });
				})
				.catch(err => {
					throw err;
				});
		})
		.catch(err => {
			throw err;
		});
});

module.exports = router;
