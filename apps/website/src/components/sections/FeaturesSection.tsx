import { HiOutlineBeaker, HiOutlineShieldCheck, HiOutlineGlobeAlt, HiOutlineCube } from 'react-icons/hi2';

const features = [
  { icon: HiOutlineBeaker, title: 'Inovação científica em lipídios' },
  { icon: HiOutlineShieldCheck, title: 'Qualidade e segurança comprovadas' },
  { icon: HiOutlineGlobeAlt, title: 'Parcerias globais estratégicas' },
  { icon: HiOutlineCube, title: 'Soluções personalizadas por aplicação' },
];

export function FeaturesSection() {
  return (
    <section className="border-y border-gray-100 bg-white py-10">
      <div className="container-main">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="group flex items-center gap-4">
              <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_10px_-4px_rgba(15,23,42,0.06)] transition-all duration-500 ease-brand group-hover:border-primary-200 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_-10px_rgba(30,63,153,0.3)]">
                <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(closest-side,rgba(30,63,153,0.1),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <feature.icon className="relative h-5 w-5 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
