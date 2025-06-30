import User from '../models/users.js'
import Order from "../models/order.js"
import products from "../models/products.js"
import Stripe from 'stripe'
export const addOrder = async (req, res) => {
    try {
        const { items, address } = req.body
        const userId = req.userId
        if (!address || items.length == 0) {
            return res.json({ success: false, message: "Invalid Data" })
        }

        let amount = await items.reduce(async (acc, item) => {
            const product = await products.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity
        }, 0)
        amount += Math.floor(amount * 0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        })
        return res.json({ success: true, message: "Order Placed Successfully" })
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
export const addOrderStripe = async (req, res) => {
    try {
        const {  items, address } = req.body
        const userId=req.userId
        const { origin } = req.headers
        if (!address || items.length == 0) {
            return res.json({ success: false, message: "Invalid Data" })
        }
        let productData = []
        let amount = await items.reduce(async (acc, item) => {
            const product = await products.findById(item.product)
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            return (await acc) + product.offerPrice * item.quantity
        }, 0)
        amount += Math.floor(amount * 0.02);
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online"
        })
        //stripe initilization
        const stripeInstances = new Stripe(process.env.SECRET_KEY)

        //create line items
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity
            }
        })

        //create session
        const session = await stripeInstances.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader?next=orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }
        })
        console.log(session.metadata)
        return res.json({ success: true, url: session.url })
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const stripeWebhooks = async (request, response) => {
    const stripeInstance = new Stripe(process.env.SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.WEB_HOOK
        );
        console.log("Webhook verified:", event.type);
    } catch (error) {
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    switch (event.type) {
        case "checkout.session.completed": {
            //const paymentIntent = event.data.object;
            //const paymentIntentId = paymentIntent.id;
            // Getting Session Metadata
            // const session = await stripeInstance.checkout.sessions.list({
            //     payment_intent: paymentIntentId,
            //});
            const session=event.data.object
            const { orderId, userId } = session.metadata;
            console.log(orderId, userId)
            await Order.findByIdAndUpdate(orderId, { isPaid: true })
            const update = await User.findByIdAndUpdate(userId, { cartItems: {} },{new:true});
            console.log(`clearing cart for ${userId}`, update.cartItems)
            break;
        }
        case "checkout.session.expired":
            {
                //const paymentIntent = event.data.object;
                //const paymentIntentId = paymentIntent.id;
                // Getting Session Metadata
                //const session = await stripeInstance.checkout.sessions.list({
                //    payment_intent: paymentIntentId,
                //});
                const session=event.data.object
                const { orderId } = session.metadata;
                await Order.findByIdAndDelete(orderId);
                break;
            }
        default:
            console.error(`unhandled event type${event.type}`)
    }
    return response.json({ received: true })
}

export const getSellerOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const userId  = req.userId;
        const orders = await Order.find({
            userId,$or: [{ paymentType: "COD" }, { isPaid: true }]}
        ).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}