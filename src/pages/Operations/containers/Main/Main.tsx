import React from 'react'

import { Layout } from '@pages/Operations/components/Layout/Layout'

import { OperationsReport } from '../../components/OperationsReport'

export const Main: React.FC = () => {
  return (
    <Layout>
      <OperationsReport />
    </Layout>
  )
}
