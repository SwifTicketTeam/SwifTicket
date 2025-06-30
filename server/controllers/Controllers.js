const fs = require('fs');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

// Server Home Page
module.exports.serverHome = (req, res) => {
    fs.readFile('./public/index.html', 'utf8', (err, data) => {
        if (err) {
            console.log("No index.html Found");
        } else {
            res.write(data);
            res.end();
        }
    })
}

// API Docs
module.exports.getAPIDocs = async (req, res) => {
    fs.readFile('./public/api.html', 'utf8', (err, data) => {
        if (err) {
            console.log("No api.html Found");
        } else {
            res.write(data);
            res.end();
        }
    })
}

// Payments
module.exports.initPayments = async (req, res) => {
    const {amount, email, metadata} = req.body;
    if(!amount || !email || !metadata) {
        return res.status(400).send({
            message: "Missing Amount, Movie or Email"
        });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "paypal"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: metadata.movie,
                            description: `${metadata.theatre}, ${metadata.show} at ${new Date(metadata.time).toLocaleString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })} • ${metadata.seats}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1
                },
            ],
            mode: "payment",
            customer_email: email,
            metadata: metadata,
            success_url: `${process.env.CLIENT}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT}/events`
        })

        return res.status(200).send({
            message: "Created Checkout Session",
            url: session.url,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Failed to Create Checkout Session"
        })
    }
}

module.exports.saveTickets = async (req, res) => {
    const session_id = req.query.session_id;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        return res.status(200).send({
            message: "Paid Successfully",
            metadata: session.metadata,
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: "Failed to Save Tickets",
        })
    }
}