const User = require('../../models/User');

module.exports = (app) => {
    // app.get('/api/counters', (req, res, next) => {
    //   Counter.find()
    //     .exec()
    //     .then((counter) => res.json(counter))
    //     .catch((err) => next(err));
    // });
  
    // app.post('/api/counters', function (req, res, next) {
    //   const counter = new Counter();
  
    //   counter.save()
    //     .then(() => res.json(counter))
    //     .catch((err) => next(err));
    // });
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            email,
            password
        } = body;

        if (!firstName) {
            res.end({
                success: false,
                message: 'Error. First name must not be blank.'
            })
        }

        if (!lastName) {
            res.end({
                success: false,
                message: 'Error. Last name must not be blank.'
            })
        }

        if (!email) {
            res.end({
                success: false,
                message: 'Error. Email must not be blank.'
            })
        }

        if (!password) {
            res.end({
                success: false,
                message: 'Error. Password must not be blank.'
            })
        }

        email = email.toLowerCase();

        // Does email exist?
        User.find({
            email: email
        }, (error, previousUsers) => {
            if (err) {
                res.end({
                    success: false,
                    message: 'Error: Server error'
                });
            } else if (previousUsers.length > 0) {
                res.end({
                    success: false,
                    message: 'Error: User already exists.'
                });
            }
            // Save user
            const newUser = new User();

            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName; 
            newUser.password = password;
            newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    res.end({
                        success: false,
                        message: 'Error: Server error'
                    });
                } else {
                    res.end({
                        success: true,
                        message: 'Signed up'
                    });
                }
            });
        });
    });
};