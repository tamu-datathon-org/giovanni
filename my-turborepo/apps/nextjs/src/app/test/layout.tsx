"use client";

import { authClient } from '@vanni/auth/client';
import React from 'react'

async function layout() {
  async function signInHandler() {
    try {
      const result = await authClient.signIn.social({
        provider: 'google',
      });
      console.log('Sign-in successful:', result);
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  }

  return (
    <div className='m-48'>
      <p>layout BIG LAYOUTS</p>
      <button onClick={signInHandler} className='btn-primary'>
        Sign In
      </button>
    </div>
  );
}

export default layout