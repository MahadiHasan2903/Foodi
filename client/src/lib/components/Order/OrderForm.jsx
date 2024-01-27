"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { HashLoader } from "react-spinners";
import { Input } from "../ui/input";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/lib/context/CartContext";
import api from "@/lib/api";
import { useSession } from "next-auth/react";

const OrderForm = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [house, setHouse] = useState("");
  const [road, setRoad] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  console.log(cartItems);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = cartItems.reduce((acc, item) => {
      const itemPrice = item.originalPrice * item.quantity;
      return acc + itemPrice;
    }, 0);

    const paymentData = {
      amount: Math.round(totalPrice * 100),
    };

    const client_secret = await api.payment.paymentProcess(paymentData);
    // console.log("Client Secret:", client_secret);

    if (!stripe || !elements) return;
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });
    if (result.error) {
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          type: "Credit Card",
        };
        const shippingAddress = {
          house,
          road,
          state,
          city,
          zipCode,
          country,
        };
        const orderData = {
          cart: cartItems.map((item) => ({
            item: item.id,
            quantity: item.quantity,
          })),
          totalPrice,
          status: "Processing",
          shippingAddress: {
            house,
            road,
            state,
            city,
            zipCode,
            country,
          },
          paymentInfo: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          },
        };

        const order = await api.orders.createOrder(accessToken, orderData);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-around w-[85%] m-5 border px-5 py-10 bg-[#d7d7d7] dark:bg-[#1d232a]">
      <div className="w-[90%] flex md:flex-row  flex-col items-center justify-between my-0 md:my-2">
        <Input
          type="text"
          id="name"
          placeholder="Full Name"
          className="mx-5 my-2 md:my-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="mx-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-[90%] flex md:flex-row  flex-col items-center my-0 md:my-2 justify-between">
        <Input
          type="text"
          id="phoneNumber"
          placeholder="Phone Number"
          className="mx-5 my-2 md:my-0"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Input type="number" id="zip" placeholder="Zip Code" className="mx-5" />
      </div>
      <div className="w-[90%]  flex md:flex-row  flex-col items-center my-0 md:my-2 justify-between">
        <Input
          type="text"
          id="street"
          placeholder="House No"
          className="mx-5 my-2 md:my-0"
          value={house}
          onChange={(e) => setHouse(e.target.value)}
        />
        <Input type="text" id="road" placeholder="Road No" className="mx-5" />
      </div>

      <div className="w-[90%] flex md:flex-row  flex-col items-center my-0 md:my-2 justify-between">
        <Input
          type="text"
          id="city"
          placeholder="City"
          className="mx-5 my-2 md:my-0"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          type="text"
          id="state"
          placeholder="State (Optional)"
          className="mx-5"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div className="w-[90%] flex md:flex-row  flex-col items-center my-0 md:my-2 justify-between">
        <Input
          type="text"
          id="country"
          placeholder="Country"
          className="mx-4 my-2 md:my-0"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <CardCvcElement
          className=" bg-[#0c0a09] flex-grow-0 w-full mx-5 my-2 md:my-0 relative rounded-[5px] !h-[35px]"
          placeholder="CVC"
          options={{
            style: {
              base: {
                fontSize: "19px",
                lineHeight: 1.5,
                color: "#444",
              },
              empty: {
                color: "#3a120a",
                backgroundColor: "transparent",
                "::placeholder": {
                  color: "#fff",
                },
              },
            },
          }}
        />
        {/* <label className="block mt-[63px] md:mt-0  absolute left-[21%] md:left-[51.5%]  text-[#a1a1aa]">
          CVC
        </label> */}
      </div>

      <div className="w-[90%] flex md:flex-row  flex-col items-center my-0 md:my-2 justify-between">
        <CardExpiryElement
          className=" bg-[#0c0a09] w-full mx-5 my-2 md:my-0 relative rounded-[5px] !h-[35px]"
          placeholder="Expiry Date"
          options={{
            style: {
              base: {
                fontSize: "19px",
                lineHeight: 1.5,
                color: "#444",
              },
              empty: {
                color: "#3a120a",
                backgroundColor: "transparent",
                "::placeholder": {
                  color: "#fff",
                },
              },
            },
          }}
        />
        {/* <label className="block mt-3 md:mt-0  absolute left-[21%] md:left-[26%]  text-[#a1a1aa]">
          Expiry Date
        </label> */}

        <CardNumberElement
          className=" bg-[#0c0a09] w-full mx-5 my-2 md:my-0 relative rounded-[5px] !h-[35px]"
          placeholder="Card Number"
          options={{
            style: {
              base: {
                fontSize: "19px",
                lineHeight: 1.5,
                color: "#444",
              },
              empty: {
                color: "#3a120a",
                backgroundColor: "transparent",
                "::placeholder": {
                  color: "#fff",
                },
              },
            },
          }}
        />
        {/* <label className="block mt-3 md:mt-0  absolute left-[21%] md:left-[26%]  text-[#a1a1aa]">
          Card Number
        </label> */}
      </div>

      <div className="w-[90%] ml-10">
        <Button
          className="mt-8 gap-x-2"
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <HashLoader size={35} /> : <>Confirm Order </>}
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
