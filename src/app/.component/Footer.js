import { Facebook, Instagram, Linkedin, Send } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Our Store</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            At Solar Store, we are committed to providing high-quality solar solutions for homes and businesses. From efficient solar panels and inverters to reliable batteries and accessories, we offer everything you need to harness the power of the sun.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex gap-3 pt-2">
                            <Link href="#"  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300"aria-label="Facebook">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#"className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link  href="#"  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300" aria-label="X (Twitter)">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300" aria-label="LinkedIn" >
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Quick links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> My account </Link>
                            </li>
                            <li> 
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> Shopping Cart </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> Wishlist </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> Checkout </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Information</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">  Privacy Policy </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> Refund Policy </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> Shipping & Return </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> Term & Conditions</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Let's get in touch</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Sign up for our newsletter and receive 10% off your
                        </p>
                        <div className="relative">
                            <input type="email" placeholder="Enter your email address..." className="w-full px-4 py-3 pr-12 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <button  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-md transition-colors" aria-label="Subscribe">
                                <Send className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center sm:text-left">
                            © 2025 SNM Solar Store. All rights reserved. Designed by Metaware Global
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">Cash on Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer