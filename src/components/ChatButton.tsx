import React from 'react';

export function ChatButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="w-14 h-14 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition text-xl" aria-label="Abrir Chat">
        💬
      </button>
    </div>
  );
}