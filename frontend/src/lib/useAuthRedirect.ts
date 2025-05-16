import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useRouter as useNextRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export const useAuthRedirect = () => {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/auth/signin') {
      router.replace('/auth/signin')
    }
  }, [router, status, pathname])
}
