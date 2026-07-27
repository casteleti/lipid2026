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
            <div key={feature.title} className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
                <feature.icon className="h-5 w-5 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
