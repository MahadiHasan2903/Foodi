"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { HashLoader } from "react-spinners";
import { Input } from "../ui/input";
import { useCart } from "@/lib/context/CartContext";
import api from "@/lib/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const OrderForm = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const userId = session?.id;
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [house, setHouse] = useState("");
  const [road, setRoad] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      firstName,
      lastName,
      email,
      phoneNumber,
      zipCode,
      house,
      road,
      city,
      state,
      country,
    ];

    if (requiredFields.some((field) => field.trim() === "")) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    console.log(cartItems);

    try {
      const totalPrice = cartItems.reduce((acc, item) => {
        const itemPrice = item.originalPrice * item.quantity;
        return acc + itemPrice;
      }, 0);

      const orderData = {
        cart: cartItems.map((item) => ({
          item: item?._id,
          quantity: item?.quantity || 0,
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
        user: userId,
      };

      console.log(orderData);
      const order = await api.orders.createOrder(accessToken, orderData);
      toast.success("Order Created Successfully");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setZipCode("");
      setHouse("");
      setRoad("");
      setCity("");
      setState("");
      setCountry("");

      clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("An error occurred while creating the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around w-[85%] m-5 border px-5 py-10 bg-[#d7d7d7] dark:bg-[#1d232a]">
      <div className="w-[90%] flex md:flex-row  flex-col items-center justify-between my-0 md:my-2">
        <Input
          type="text"
          id="fname"
          placeholder="First Name"
          className="mx-5 my-2 md:my-0"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          id="lname"
          placeholder="Last Name"
          className="mx-5 my-2 md:my-0"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="mx-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <Input
          type="text"
          id="road"
          placeholder="Road No"
          className="mx-5"
          value={road}
          onChange={(e) => setRoad(e.target.value)}
        />
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
          type="number"
          id="zip"
          placeholder="Zip Code"
          className="mx-5"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
      <div className="w-[90%] flex md:flex-row  flex-col items-center my-0 md:my-2 justify-between">
        <Input
          type="text"
          id="state"
          placeholder="State"
          className="mx-5 my-2 md:my-0"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Input
          type="text"
          id="country"
          placeholder="Country"
          className="mx-5"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
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
