const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.token)
const cors = require('cors')({ origin: true });
exports.paystripe = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const reqMethod = req.method
        let message = 'Make a payment with Stripe!'

        if (reqMethod === 'POST') {
            let token = req.body.token
            let amount = req.body.amount

            stripe.charges.create({
                amount: 199,
                currency: "usd",
                description: "Example charge",
                source: token,
            }).then(function (result) {
                res.status(200).send('Your card has been successfully charged!');
            }).catch(function () {
                res.status(200).send('There was an error.');
            });
        } else {
            res.status(200).send(message);
        }
    });
});
