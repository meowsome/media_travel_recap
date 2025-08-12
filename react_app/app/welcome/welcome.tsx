import React, { useState } from 'react';
import InteractiveForm from '../components/InteractiveForm';


export function Welcome() {

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4 flex items-center justify-center">
            <h1 className="mb-4 text-4xl font-extrabold">Media Travel Recap</h1>
          </div>
        </header>
        
        
        <InteractiveForm />
      </div>
    </main>
  );
}