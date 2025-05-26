"use client"

import LiveSignups from "./LiveSignups"
import SheetzuSignupInline from "./SheetzuSignupInline"
import { getUserData, type UserData } from "../lib/sheets"
import { motion } from 'framer-motion'
import { useEffect, useState } from "react"
import UserWebsite from "./UserWebsite"
import UserNotFound from "./UserNotFound"

export default function HomeClient({ lastSignups }: { lastSignups: UserData[] }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const hostname = window.location.hostname;
  const sub = hostname.split('.')[0];
  console.log({ sub });


  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData(sub);
      setUserData(userData);
      console.info({ userData });
    }
    fetchData();
  }, []);

  return (
    <>
    {(sub && userData) ? (
      <UserWebsite sheetId={userData.sheetId} isPaid={userData.isPaid} username={userData.username} />
    ) : (sub && sub !== 'www' && sub !== 'localhost' && !userData) ? (
      <UserNotFound username={sub} />
    ) :
    <main className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center border-b border-gray-200 bg-[#f8fafc] min-h-[50vh]">
        <div className="w-full max-w-2xl text-center mt-24 mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-10 text-gray-900 tracking-tight leading-tight" style={{letterSpacing:0.01}}>
            Start selling from a <span className="bg-[#e3fee3] px-2 rounded" style={{paddingBottom:15}}>single Google Sheet</span>
          </h1>
          {/* Remove the old button and modal logic */}
          {/* <div className="flex justify-center items-center gap-6 mt-10">
            <button ...>Create your Sheetzu</button>
            <a ...>Watch video</a>
          </div>
          {showForm && <SheetzuSignupModal onClose={() => setShowForm(false)} />} */}
          {/* Place the new inline signup here */}
          <div className="flex justify-center flex-col mx-4 items-center gap-6 mt-10 mb-10">
            <SheetzuSignupInline />
            {/* <img
            src="/sheetzu_flow.gif"
            alt="How to set sheet permissions"
            style={{
              width: '100%',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              marginTop: '1rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              opacity: 1,
              transform: 'scale(0.96)',
              animation: 'fadeInScale 0.5s ease forwards',
              animationDelay: '0.15s',
            }}
          /> */}
          </div>
        </div>
      </section>
      {/* Live Signups Section */}
      {/* <section className="flex flex-col items-center justify-end flex-1 min-h-[30vh]">
        <h2 className="text-base text-gray-400 mb-4 tracking-widest uppercase">See what our last 5 hoomans made</h2>
        <div className="relative w-full flex flex-col items-center" style={{minHeight:180}}>
          <LiveSignups lastSignups={lastSignups} />
        </div>
      </section> */}
      {/* No Complex Setup Section */}
      {/* <section className="max-w-3xl mx-auto py-16 px-4 border-b border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">No Complex Setup. No Technical Headaches.</h2>
        <p className="text-lg text-gray-600 mb-8">Just type your product details into a Google Sheet, and your store is live.</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <li className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-3xl mb-3">🛍</span>
            <span className="text-base text-gray-700 text-center font-medium">Set availability, pricing, dates—all from your Sheet.</span>
          </li>
          <li className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-3xl mb-3">📸</span>
            <span className="text-base text-gray-700 text-center font-medium">Add images effortlessly—no extra tools needed.</span>
          </li>
          <li className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-3xl mb-3">⏳</span>
            <span className="text-base text-gray-700 text-center font-medium">Instant updates—see changes in real time.</span>
          </li>
        </ul>
        <p className="text-base text-gray-500 mb-2 text-center">No databases, no hiring developers for small edits, no juggling a dozen platforms. Just one simple sheet that does it all.</p>
        <div className="text-base text-blue-700 font-semibold text-center mt-2">💡 Your Sheet = Your Store</div>
      </section> */}
      {/* Simple Creamy Animated Play Button between sections */}
      <div className="relative flex justify-center items-center">
        {/* Quick Tour Arc Label */}
        <svg
          width={146}
          height={74}
          className="absolute left-1/2 -translate-x-1/2 top-[-85px] pointer-events-none overflow-visible"
        >
          <defs>
            <path
              id="quickArc"
              d="M41,64 A35,32 0 0,1 105,64"
              fill="none"
            />
          </defs>
          <text
            fill="#black"
            fontSize="12"
            // fontWeight="bold"
            textAnchor="middle"
          >
            <textPath href="#quickArc" startOffset="50%">
              quick tour
            </textPath>
          </text>
        </svg>
        <motion.button
          aria-label="Watch explainer video"
          className="relative overflow-hidden z-20 rounded-full border border-[#e3fee3] flex items-center justify-center focus:outline-none"
          style={{
            width: 64,
            height: 64,
            transformOrigin: 'center center',
            position: 'absolute',
            left: '50%',
            marginLeft: -32,
            top: -32,
            transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), filter 0.3s cubic-bezier(0.4,0,0.2,1)'
          }}
          initial={{
            scale: 1,
            boxShadow: '0 0 0 0 rgba(15,157,88,0)',
            filter: 'none'
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 24px 8px rgba(15, 157, 88, 0.13)',
            filter: 'drop-shadow(0 0 20px rgba(15, 157, 88, 0.34))'
          }}
          whileTap={{ scale: 1.05 }}
          onClick={() => window.open('https://www.youtube.com/watch?v=YOUR_VIDEO_ID', '_blank')}
        >
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, #e3fee3 0%,rgba(15, 157, 88, 0.36) 100%)',
              backgroundSize: '200% 200%',
              borderRadius: '50%',
            }}
            animate={{
              backgroundPosition: [
                '50% 50%',
                '20% 80%',
                '80% 20%',
                '50% 50%',
                '80% 80%',
                '20% 20%',
                '50% 50%'
              ],
              backgroundSize: [
                '200% 200%',
                '250% 250%',
                '200% 200%',
                '300% 300%',
                '200% 200%'
              ],
            }}
            transition={{
              duration: 12,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          />
          <svg className="ml-2 relative z-10" width="64" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="48,32 13,53 13,11"
              fill="#0F9D58"
              stroke="#0F9D58"
              strokeWidth={12}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
      </div>
      {/* Who is Sheetzu for? */}
      <section className="max-w-3xl mx-auto py-16 px-4 border-b border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">Who is Sheetzu for?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">👩‍🎨</span>
            <div>
              <p className="text-base text-gray-700 font-medium">You are an artist and want to sell your creations—without dealing with tech.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">🎭</span>
            <div>
              <p className="text-base text-gray-700 font-medium">You teach dance and need to sell class tickets—without monthly fees.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">🧶</span>
            <div>
              <p className="text-base text-gray-700 font-medium">You're helping your mom sell her crochet—without overwhelming her.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">📚</span>
            <div>
              <p className="text-base text-gray-700 font-medium">You run workshops and want signups—without complicated setups.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Sell Anything Instantly */}
      <section className="max-w-3xl mx-auto py-16 px-4 border-b border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">Sell Anything. Instantly.</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">☕</span>
            <div>
              <p className="text-base text-gray-700 font-medium">A home baker selling cakes from a simple sheet.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">🎟</span>
            <div>
              <p className="text-base text-gray-700 font-medium">A musician selling concert tickets—zero setup.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">🏕</span>
            <div>
              <p className="text-base text-gray-700 font-medium">A travel guide selling adventure packages—effortlessly.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">📖</span>
            <div>
              <p className="text-base text-gray-700 font-medium">An author selling digital downloads—no extra tools.</p>
            </div>
          </li>
        </ul>
        <p className="text-base text-gray-500 mt-4 text-center">Whatever you want to sell, Sheetzu makes it happen.</p>
      </section>
      {/* Why Sheetzu? */}
      <section className="max-w-3xl mx-auto py-16 px-4 border-b border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">Why Sheetzu?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">🚀</span>
            <div>
              <p className="text-base text-gray-700 font-medium">No subscriptions – Pay once, sell forever.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">💡</span>
            <div>
              <p className="text-base text-gray-700 font-medium">Zero coding – Your Google Sheet does the work.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">🔄</span>
            <div>
              <p className="text-base text-gray-700 font-medium">Real-time updates – Change a price, add a product, or update stock—instantly.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-4xl">💸</span>
            <div>
              <p className="text-base text-gray-700 font-medium">No commissions – Keep all your earnings.</p>
            </div>
          </li>
        </ul>
      </section>
      {/* Set Up Your Store in Minutes */}
      <section className="max-w-3xl mx-auto py-16 px-4 border-b border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">Set Up Your Store in Minutes</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <li className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-3xl mb-3">✅</span>
            <span className="text-base text-gray-700 text-center font-medium">Enter your product details in a Google Sheet.</span>
          </li>
          <li className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-3xl mb-3">✅</span>
            <span className="text-base text-gray-700 text-center font-medium">Add images, prices, availability—right in the Sheet.</span>
          </li>
          <li className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-100">
            <span className="text-3xl mb-3">✅</span>
            <span className="text-base text-gray-700 text-center font-medium">Share your store link & start selling!</span>
          </li>
        </ul>
        <p className="text-base text-gray-500 text-center">That's it. No extra tools. No stress.</p>
      </section>
      {/* Final CTA */}
      <section className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Why Wait? Start Selling Now!</h2>
        <p className="text-lg text-gray-600 mb-6">💰 Lock your lowest one-time price today.</p>
        <a href="#waitlist" className="inline-block px-8 py-3 rounded bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition">Join the Waitlist</a>
      </section>
    </main>
    }
    </>
  )
}
