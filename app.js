const express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	indexRoutes = require('./routes/indexRoutes'),
	pollRoutes = require('./routes/pollRoutes'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),

	methodOverride = require('method-override'),
	User = require('./models/user');
const url = process.env.mongourl;
mongoose
	.connect(process.env.murl, { useNewUrlParser: true, useCreateIndex: true })
	.then(console.log('Mongodb atlas connected'))
	.catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

app.use(
	require('express-session')({
		secret: 'My CP_Poll',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});
app.use('/', indexRoutes);
app.use('/polls', pollRoutes);

app.listen(process.env.PORT || 9000, function() {
	console.log('The CP_Poll server has started!');
});
