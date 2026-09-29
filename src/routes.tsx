import type { RouteObject } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { placeholders } from '@/content/site'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'ailments',
        element: <PlaceholderPage copy={placeholders.ailments} />,
      },
      {
        path: 'therapies',
        element: <PlaceholderPage copy={placeholders.therapies} />,
      },
      {
        path: 'sign-in',
        element: <PlaceholderPage copy={placeholders.signIn} />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
