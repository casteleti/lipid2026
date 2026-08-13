import Image from 'next/image';

export function LiaAvatar({ tamanho = 'md' }: { tamanho?: 'sm' | 'md' }) {
  const dimensao = tamanho === 'sm' ? 'h-9 w-9' : 'h-16 w-16';
  const px = tamanho === 'sm' ? 36 : 64;

  return (
    <span className={`relative inline-flex flex-shrink-0 ${dimensao} rounded-full`}>
      <Image
        src="/lia/lia-avatar.webp"
        alt="Lia"
        width={px}
        height={px}
        className="h-full w-full rounded-full object-cover"
      />
    </span>
  );
}
