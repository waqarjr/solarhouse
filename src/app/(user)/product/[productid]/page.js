'use client'
import { useEffect, useState } from 'react'
import { useParams } from "next/navigation"
import { Heart, Minus, Plus, Facebook, Twitter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import useStoreData from '@/app/lib/useStoreData'
import api from '@/app/lib/api'
import ProductPageSkeleton from "./ProductPageSkeleton"
import SlidePerView from './SliderPage'

const ProductPage = () => {
    const { productid } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [apiProduct, setApiProducts] = useState([])
    const { toggleCart, toggleWishlist } = useStoreData()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getApiProducts = async () => {
            try {
                const response = await api.get(`/products?slug=${productid}`)
                setApiProducts(response.data)
            } catch (e) {
                console.log(e.message)
            } finally {
                setLoading(false)
            }
        }
        getApiProducts()
    }, [productid])

    // Check if product is already in wishlist on component mount
    useEffect(() => {
        if (apiProduct[0]?.id) {
            const wishlistStorage = localStorage.getItem("wishlist")
            if (wishlistStorage) {
                const wishlistData = JSON.parse(wishlistStorage)
                const isInWishlist = wishlistData.some((item) => item.id === apiProduct[0].id)
                setIsWishlisted(isInWishlist)
            }
        }
    }, [apiProduct])

    const wishlistData = (id) => {
        const wishlistStorage = localStorage.getItem("wishlist")
        
        if (wishlistStorage) {
            const existingData = JSON.parse(wishlistStorage)
            const filter = existingData.filter((v) => v.id === id)
            
            if (filter.length) {
                const updatedData = existingData.filter((v) => v.id !== id)
                localStorage.setItem("wishlist", JSON.stringify(updatedData))
                setIsWishlisted(false)
            } else {
                const updatedData = [...existingData, { id: id }]
                localStorage.setItem("wishlist", JSON.stringify(updatedData))
                setIsWishlisted(true)
            }
        } else {
            const updatedData = [{ id: id }]
            localStorage.setItem("wishlist", JSON.stringify(updatedData))
            setIsWishlisted(true)
        }
        
        toggleWishlist()
    }

    const handleAddToCart = (id) => {
        if (localStorage.getItem("name")) {
            const existingData = JSON.parse(localStorage.getItem("name"))
            const filter = existingData.filter((v) => v.id === id)
            if (filter.length) {
                filter[0].qty = quantity
                localStorage.setItem("name", JSON.stringify(existingData))
            } else {
                const updatedData = [...existingData, { id: id, qty: quantity }]
                localStorage.setItem("name", JSON.stringify(updatedData))
            }
        } else {
            const existingData = []
            const updatedData = [...existingData, { id: id, qty: quantity }]
            localStorage.setItem("name", JSON.stringify(updatedData))
        }
        toggleCart()
    }

    if (loading) return <ProductPageSkeleton />

    const currentProduct = apiProduct[0]
    const hasCategories = currentProduct?.categories && currentProduct.categories.length > 0
    const hasTags = currentProduct?.tags && currentProduct.tags.length > 0

    return (
        <>
            <div className="min-h-screen flex flex-col gap-3">
                <div className="max-w-7xl my-8 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <nav className="text-sm my-6">
                        <ol className="flex items-center space-x-2 text-gray-600">
                            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
                            <li>/</li>
                            <li><Link href="/shop" className="hover:text-gray-900">Shop</Link></li>
                            <li>/</li>
                            <li className="text-gray-900 font-medium">{productid}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-lg p-6 lg:p-8">
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
                                <Image src={currentProduct?.images[selectedImage]?.src || currentProduct?.images[0]?.src || "/image1.jpg"} alt={currentProduct?.images[selectedImage]?.alt || "product image"} priority width={600} height={600} className="w-full h-full object-cover" />
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-3">
                                {currentProduct?.images.map((image, index) => (
                                   <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <Image src={image.src} alt={`${currentProduct.name} ${index + 1}`} width={500} height={500} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-6">
                            <div className="pb-6 border-b-2 border-gray-200">
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 capitalize">
                                    {currentProduct?.name || currentProduct?.categories[0]?.name}
                                </h1>
                                <p className="text-3xl font-semibold text-blue-600">
                                    RS {currentProduct?.price}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-700 leading-relaxed">
                                    <span dangerouslySetInnerHTML={{ __html: currentProduct?.short_description }} />
                                </p>
                            </div>

                            {currentProduct?.featured && (
                                <div className="bg-gray-50 rounded-lg p-5">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                        Perfect for:
                                    </h2>
                                    <ul className="space-y-2">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                                <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg overflow-hidden w-full sm:w-auto">
                                    <button onClick={() => { (quantity > 1) && setQuantity(pre => pre - 1) }} className="px-3 sm:px-4 py-3 sm:py-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors" disabled={quantity === 1}>
                                        <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <span className="px-4 sm:px-6 py-2 sm:py-3 font-semibold text-base sm:text-lg min-w-[50px] sm:min-w-[60px] text-center">
                                        {quantity}
                                    </span>
                                    <button onClick={() => setQuantity(pre => pre + 1)} className="px-3 sm:px-4 py-3 sm:py-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors">
                                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                                <button onClick={() => handleAddToCart(currentProduct?.id)} className="flex-1 cursor-pointer bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base">
                                    Add to Cart
                                </button>
                            </div>

                            <button onClick={() => wishlistData(currentProduct?.id)} className={`flex cursor-pointer items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                <span className="font-medium">
                                    {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                </span>
                            </button>

                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                {/* Categories - Only show if data exists */}
                                {hasCategories && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-semibold text-gray-900">Categories:</span>
                                        {currentProduct.categories.map((category, index) => (
                                            <Link href="" key={index} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                                                {category?.name || "Uncategorized"}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Tags - Only show if data exists */}
                                {hasTags && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-semibold text-gray-900">Tags:</span>
                                        {currentProduct.tags.map((tag, index) => (
                                            <Link href="#" key={index} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                                                {tag?.name || "Untagged"}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Social Media */}
                            <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-200">
                                <span className="font-semibold text-gray-900">Share:</span>
                                <div className="flex gap-2 [&>*]:cursor-pointer">
                                    <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                                        </svg>
                                    </button>
                                    <button className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl my-8 mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Product Description</h2>
                    <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-base">
                        <div>
                            <p className="text-gray-700 leading-relaxed">
                                <span dangerouslySetInnerHTML={{ __html: currentProduct?.description }} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <SlidePerView />
        </>
    )
}

export default ProductPage