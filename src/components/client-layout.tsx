'use client'

import React from 'react'
import ProgressBar from './nprogress-bar'
import LenisProvider from './lenis-provider'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LenisProvider />
      <ProgressBar />
      {children}
    </>
  )
}
