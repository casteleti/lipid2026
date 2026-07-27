import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.technologyOnApplication.deleteMany();
  await prisma.application.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.user.deleteMany();
  await prisma.lead.deleteMany();

  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@daksa.app.br',
      name: 'Admin Daksa',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin criado:', admin.email);

  const cosmeticos = await prisma.application.create({
    data: {
      name: 'Cosméticos',
      slug: 'cosmeticos',
      description:
        'Soluções inovadoras em lipídios para formulações cosméticas premium. Nossos lipossomas garantem melhor absorção e eficácia de ativos.',
      excerpt: 'Cosméticos premium com tecnologia de ponta',
      order: 1,
    },
  });

  const pharma = await prisma.application.create({
    data: {
      name: 'Farmacêutica',
      slug: 'pharma',
      description:
        'Tecnologias de entrega controlada para ativos farmacêuticos. Lipossomas para melhor biodisponibilidade e redução de efeitos colaterais.',
      excerpt: 'Entrega controlada de ativos farmacêuticos',
      order: 2,
    },
  });

  const nutraceutical = await prisma.application.create({
    data: {
      name: 'Nutracêutico',
      slug: 'nutraceutico',
      description:
        'Encapsulação de nutrientes para máxima biodisponibilidade. Proteção de vitaminas, ômega-3 e outros ativos sensíveis.',
      excerpt: 'Nutrientes com proteção e biodisponibilidade',
      order: 3,
    },
  });

  console.log('Aplicações criadas: 3');

  const lipossomas = await prisma.technology.create({
    data: {
      name: 'Lipossomas',
      slug: 'lipossomas',
      description:
        'Vesículas esféricas compostas por fosfolipídios que encapsulam ativos hidrofílicos e lipofílicos. Tecnologia comprovada em dermatologia e farmacêutica.',
      excerpt: 'Vesículas de fosfolipídios para encapsulação',
      order: 1,
    },
  });

  const fosfolipidios = await prisma.technology.create({
    data: {
      name: 'Fosfolipídios',
      slug: 'fosfolipidios',
      description: 'Componentes fundamentais das membranas celulares. Fornecedores de alta pureza.',
      excerpt: 'Componentes de membranas celulares',
      order: 2,
    },
  });

  const encapsulacao = await prisma.technology.create({
    data: {
      name: 'Encapsulação',
      slug: 'encapsulacao',
      description: 'Tecnologia de proteção de ativos sensíveis. Melhora estabilidade, biodisponibilidade e eficácia.',
      excerpt: 'Proteção de ativos sensíveis',
      order: 3,
    },
  });

  console.log('Tecnologias criadas: 3');
  void fosfolipidios;

  await prisma.technologyOnApplication.createMany({
    data: [
      { applicationId: cosmeticos.id, technologyId: lipossomas.id },
      { applicationId: pharma.id, technologyId: lipossomas.id },
      { applicationId: nutraceutical.id, technologyId: encapsulacao.id },
    ],
  });

  console.log('Relacionamentos criados');

  await prisma.lead.create({
    data: {
      email: 'contato@empresa1.com.br',
      name: 'João Silva',
      company: 'Empresa 1',
      message: 'Interessado em cosméticos',
      source: 'website',
    },
  });

  console.log('Seed completo!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
