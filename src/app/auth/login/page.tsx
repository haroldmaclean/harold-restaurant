// src/app/auth/login/page.tsx
// This is the actual frontend page for the login form
import LoginForm from '@/app/components/LoginForm'

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <LoginForm />
    </div>
  )
}
