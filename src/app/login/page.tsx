import {Metadata} from 'next'
import LoginForm from '@/lib/components/auth/login-form'
import {Heading} from '@/lib/components/layout/heading'

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Heading variant="1" text="Sign in" className="text-center"/>
        <LoginForm />
      </div>
    </main>
  );
}
