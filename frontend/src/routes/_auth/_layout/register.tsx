import { RegisterPage } from '@/pages/auth/register'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_layout/register')({
  component: RegisterPage,
})

