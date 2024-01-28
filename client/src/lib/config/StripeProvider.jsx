// "use client";
// import React, { useEffect, useState } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import api from "../api";

// const StripeProvider = ({ children }) => {
//   const [stripeApikey, setStripeApikey] = useState(null);

//   useEffect(() => {
//     const fetchStripeApikey = async () => {
//       try {
//         const apiKey = await api.payment.getStripeApikey();
//         // console.log("Get Stripe API Key in Provider:", apiKey);
//         setStripeApikey(apiKey);
//       } catch (error) {
//         console.error("Error fetching Stripe API Key:", error);
//       }
//     };

//     fetchStripeApikey();
//   }, []);

//   return <Elements stripe={loadStripe(stripeApikey)}>{children}</Elements>;
// };

// export default StripeProvider;
