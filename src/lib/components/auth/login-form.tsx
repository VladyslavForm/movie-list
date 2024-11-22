'use client'
import React from 'react'
import {useFormState, useFormStatus} from 'react-dom'
import {MainButton} from '@/lib/components/buttons/main-button'
import {authenticate} from '@/lib/actions'
import {TextInput} from '@/lib/components/inputs/text-input'
import {Checkbox} from '@/lib/components/inputs/checkbox'

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-10">
        <div className="w-full">
          <TextInput placeholder="Email" name="email" type="email" className="mb-6"/>
          <TextInput placeholder="Password" name="password" type="password" className="mb-6"/>
          <Checkbox label="Remember me" name="rememberMe" className="mb-6 mx-auto"/>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <MainButton className="mt-4 w-full" aria-disabled={pending}>
      Log in
    </MainButton>
  );
}
