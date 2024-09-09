const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51PwrO5CJ4aOiDxJLPYxXD7oNaIKSWmq2wuByd8N1pC1hq8NK1V776jd76vS71CcFG02ppKzJho7S7IbnAU9m13Ey00VunF8wql'); // Replace with your Stripe secret key

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
    const { product, customerDetails } = req.body;

    try {
        // Create a new checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.price * 100, // Amount in paise
                },
                quantity: product.quantity,
            }],
            mode: 'payment',
            success_url: 'https://yourdomain.com/success', // Replace with your success URL
            cancel_url: 'https://yourdomain.com/cancel', // Replace with your cancel URL
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});