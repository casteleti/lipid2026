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
    // top-28 garante que o painel nunca sobe até colidir com o header (que tem ~97px de
    // altura no estado não-rolado) — sem esse limite, um painel de altura fixa numa janela
    // baixa cresce pra cima e passa por cima do menu.
    <div className="fixed bottom-6 right-6 top-28 z-40 flex items-end justify-end">
      {fase === 'intro' && (
        <LiaIntroPanel onClose={() => setFase('fechado')} onStart={() => setFase('chat')} />
      )}
      {fase === 'chat' && <LiaChatWindow onClose={() => setFase('fechado')} />}
    </div>
  );
}
