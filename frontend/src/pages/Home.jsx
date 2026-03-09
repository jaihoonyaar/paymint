import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import logo from "../assets/logo.png";
import ruleImg from "../assets/rule.png";
import paymentImg from "../assets/payment.png";
import cashbackImg from "../assets/cashback.png";
import connectImg from "../assets/247connect.png";
import robotImg from "../assets/Robot.png";
import repeatImg from "../assets/repeat.png";
import veggieImg from "../assets/veggie.png";
import milkImg from "../assets/milk.png";
import samosaImg from "../assets/samosa.png";
import sweetImg from "../assets/sweet.png";
import groceryImg from "../assets/grocery.png";



export default function Home() {
  return (
    <div className="min-h-screen bg-[#86BBD8]/20">

      {/* HERO */}
      <div
        className="relative h-screen bg-cover bg-[center_35%]"
        style={{
          backgroundImage: `url(${hero})`
        }}
      >

        {/* NAVBAR */}
        <div className="absolute top-0 left-0 right-0 flex justify-end items-center px-10 py-6">

        

          <div className="flex gap-4 items-center">

            
            <Link
              to="/login"
              className="px-10 py-3 bg-[#fa5a04] text-white rounded-lg shadow-lg font-semibold  hover:bg-[#082d09] transition"
            >
              Login
            </Link>

          </div>

        </div>


        {/* HERO CONTENT */}
        <div className="flex flex-col items-center justify-center text-center h-full px-6">

          {/* BIG HERO LOGO */}
          <img
            src={logo}
            alt="PayMint"
            className="h-32 md:h-40 mb-2 drop-shadow-2xl object-contain"
          />

          <h1 className="text-5xl md:text-6xl font-bold text-[#2F4858] drop-shadow-lg">

            Where every payment
            <br />
            mints a reward.

          </h1>

          <p className="mt-6 text-lg text-[#2F4858] max-w-xl drop-shadow">

            PayMint empowers local merchants to instantly reward customers
            with cashback after every UPI payment.

          </p>


          {/* BUTTONS */}
          <div className="mt-8 flex gap-4 flex-wrap justify-center">

            <Link
              to="/register"
              className="px-7 py-3 bg-[#F6AE2D] text-white rounded-lg text-lg font-medium hover:bg-[#F26419] transition shadow-lg"
            >
              Get Started
            </Link>

            <Link
              to="/register"
              className="px-7 py-3 border-2 border-[#33658A] text-[#33658A] rounded-lg text-lg hover:bg-[#33658A] hover:text-white transition shadow-md"
            >
              Register as Merchant
            </Link>

          </div>

        </div>

      </div>


      {/* HOW IT WORKS */}
      <div className="py-24 px-10">

        <h2 className="text-5xl font-bold text-center text-[#2F4858]">
          How It Works
        </h2>
         <p className="text-center text-gray-600 mt-4">
    A simple 3-step system that turns everyday payments into rewarding experiences.
  </p>
        <div className="grid md:grid-cols-3 gap-10 mt-14 text-center">

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <img
  src={ruleImg}
  alt="Create Cashback Rule"
  className=" mx-auto mb-4"
/>

            <h3 className="text-xl font-semibold text-[#33658A]">
              Create Cashback Rule
            </h3>

            <p className="mt-3 text-gray-600">
              Define percentage, tiered, or lottery cashback rules.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <img
  src={paymentImg}
  alt="Customer Pays"
  className=" mx-auto mb-4"
/>

            <h3 className="text-xl font-semibold text-[#33658A]">
              Customer Pays
            </h3>

            <p className="mt-3 text-gray-600">
              Customers pay using UPI or digital payments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
            <img
  src={cashbackImg}
  alt="Cashback Minted"
  className=" mx-auto mb-4"
/>

            <h3 className="text-xl font-semibold text-[#33658A]">
              Cashback Minted
            </h3>

            <p className="mt-3 text-gray-600">
              Cashback is instantly credited automatically.
            </p>
          </div>

        </div>

      </div>


      {/* BENEFITS */}
      <div className="py-24 px-10 bg-gray-50">

        <h2 className="text-5xl font-bold text-center text-[#2F4858]">
          Why Merchants Love PayMint
        </h2>
        <p className="text-center text-gray-600 mt-4">
    Smart cashback tools that help merchants attract customers and boost loyalty.
  </p>

        <div className="grid md:grid-cols-3 gap-10 mt-14 text-center">

          <div className="p-8">
            <img
  src={repeatImg}
  alt="📈"
  className=" mx-auto mb-4"
/>
            

            <h3 className="text-xl font-semibold text-[#33658A]">
              Increase Repeat Customers
            </h3>

            <p className="mt-3 text-gray-600">
              Customers return more often when they receive rewards.
            </p>
          </div>

          <div className="p-8">
            <img
  src={robotImg}
  alt="🤖"
  className=" mx-auto mb-4"
/>
           

            <h3 className="text-xl font-semibold text-[#33658A]">
              Automatic Rewards
            </h3>

            <p className="mt-3 text-gray-600">
              Set rules once and cashback happens automatically.
            </p>
          </div>

          <div className="p-8">
            <img
  src={connectImg}
  alt="🏪"
  className=" mx-auto mb-4"
/>
         

            <h3 className="text-xl font-semibold text-[#33658A]">
              Works for Every Shop
            </h3>

            <p className="mt-3 text-gray-600">
              Perfect for street vendors, grocery stores, and more.
            </p>
          </div>

        </div>

      </div>


      {/* MERCHANT TYPES */}
<div className="py-24 px-10">

  <h2 className="text-5xl font-bold text-center text-[#2F4858]">
    Built for Local Merchants
  </h2>

  <p className="text-center text-gray-600 mt-4">
    From street vendors to grocery stores, everyone can reward customers.
  </p>

  <div className="grid md:grid-cols-5 gap-8 mt-14 text-center">

    {[
      [veggieImg, "Vegetable Vendors"],
      [samosaImg, "Street Food Stalls"],
      [sweetImg, "Sweet Shops"],
      [milkImg, "Milk Vendors"],
      [groceryImg, "Grocery Stores"]
    ].map((item, index) => (

      <div
        key={index}
        className="p-6 bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition min-h-[220px]"
      >

        <img
          src={item[0]}
          alt={item[1]}
          className="h-32 mx-auto"
        />

        <h3 className="mt-3 font-semibold text-[#33658A]">
          {item[1]}
        </h3>

      </div>

    ))}

  </div>

</div>


      {/* CTA */}
      <div className="py-24 px-10 bg-[#33658A] text-center text-white">

        <h2 className="text-4xl font-bold">
          Start Rewarding Customers Today
        </h2>

        <p className="mt-4 text-lg">
          Join merchants turning every payment into customer loyalty.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-block bg-[#F6AE2D] hover:bg-[#F26419] px-8 py-4 rounded-lg text-lg font-semibold transition"
        >
          Create Merchant Account
        </Link>

      </div>


      <div className="text-center py-3 text-sm text-gray-500 bg-white border-t">
          © 2026 PayMint • Built by Jai Prakash Rai
        </div>

    </div>
  );
}