import React from 'react'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './PageShell.css'
import { MantineProvider } from '@mantine/core'
import { MainLayout } from '../components/Layout'
import { NotificationsProvider } from '@mantine/notifications'
import { clipboardWatcher, } from '../utils/clipboard'

export { PageShell }

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  const cl = clipboardWatcher()
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
          <NotificationsProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </NotificationsProvider>
        </MantineProvider>
      </PageContextProvider>
    </React.StrictMode>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 900,
        margin: 'auto',
      }}
    >
      {children}
    </div>
  )
}
