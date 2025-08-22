import React from 'react'
import { Wishlist } from '../components'

const WishlistPage = () => {
  window.scrollTo({ top: 0 })
  return (
    <div className='flex flex-col items-center justify-center content-center bg-brand'>
      <h1 className="valky text-2xl md:text-5xl text-white mt-20">
        Wishlisht
      </h1>
      <Wishlist />
    </div>
  )
}

export default WishlistPage