'use client'
import { makeStore } from '@/lib/store'
import { Provider } from 'react-redux'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode,
}) {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>
}