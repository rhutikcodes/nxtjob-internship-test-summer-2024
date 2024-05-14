"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

function WelcomePage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <h1 className="text-xl font-semibold text-gray-900 py-4 text-center">Welcome to Our Community!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/introduction">
                    <div className="bg-green-400 border shadow rounded-lg p-6 flex flex-col items-center justify-center h-72 cursor-pointer">
                        <h2 className="font-bold text-lg">Introductions</h2>
                        <p>Meet and greet new members.</p>
                    </div>
                </Link>
                <Link href="/announcements">
                    <div className="bg-yellow-400 border shadow rounded-lg p-6 flex flex-col items-center justify-center h-72 cursor-pointer">
                        <h2 className="font-bold text-lg text-gray-900">Announcements</h2>
                        <p>Stay updated with the latest news.</p>
                    </div>
                </Link>
                <Link href="/success">
                    <div className=" bg-cyan-600 border shadow rounded-lg p-6 flex flex-col items-center justify-center h-72 cursor-pointer">
                        <h2 className="font-bold text-lg">Success Stories</h2>
                        <p>Get inspired by the success of others.</p>
                    </div>
                </Link>
                <Link href="/career">
                    <div className="bg-red-400 border shadow rounded-lg p-6 flex flex-col items-center justify-center h-72 cursor-pointer">
                        <h2 className="font-bold text-lg">Career Discussions</h2>
                        <p>Share and discuss career opportunities.</p>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
}


export default WelcomePage