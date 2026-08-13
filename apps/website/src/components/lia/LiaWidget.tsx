'use client';

import { useState } from 'react';
import { LiaFloatingButton } from './LiaFloatingButton';
import { LiaIntroPanel } from './LiaIntroPanel';
import { LiaChatWindow } from './LiaChatWindow';

type Fase = 'fechado' | 'intro' | 'chat';

export function LiaWidget() {
  const [fase, setFase] = useState<Fase>('fechado');

  if (fase === 'fechado') {
    return <LiaFloatingButton onClick={() => setFase('intro')} />;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {fase === 'intro' && (
        <LiaIntroPanel onClose={() => setFase('fechado')} onStart={() => setFase('chat')} />
      )}
      {fase === 'chat' && <LiaChatWindow onClose={() => setFase('fechado')} />}
    </div>
  );
}
