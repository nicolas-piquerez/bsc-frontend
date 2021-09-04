import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useGetPriceDataFromLP } from 'hooks/useGetPriceData'
import { useLocation } from 'react-router'

type PageMeta = {
    title: string
    description?: string
    image?: string
}
  

const DEFAULT_META: PageMeta = {
    title: 'Swap.org',
    description: 'Cheaper and faster than UniSwap? Discover Swap.org, the go to AMM and yield farm for BSC.',
    image: 'https://swap.org/logo.png',
  }
  
const customMeta: { [key: string]: PageMeta } = {
    'swap': {
      title: 'Swap | Swap.org',
    },
    'pool': {
      title: 'Liquidity | Swap.org',
    },
    'add': {
      title: 'Add Liquidity | Swap.org',
    },
}
const PageMeta = () => {
    const { pathname } = useLocation()
    const bananaPriceUsd = useGetPriceDataFromLP()
    const bananaPriceUsdDisplay = !bananaPriceUsd
      ? ''
      : `$${bananaPriceUsd?.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`
    const path = pathname.split('/')[1];
    const pageMeta = customMeta[path] || {}
    const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
    const pageTitle = bananaPriceUsdDisplay ? [bananaPriceUsdDisplay, title].join(' - ') : title

    return (
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Helmet>
    )
  }

export default PageMeta
