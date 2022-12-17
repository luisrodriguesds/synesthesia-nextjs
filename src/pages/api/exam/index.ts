import prisma from '../../../server/db';
import { apiHandler } from '../../../server/main';

const handler = apiHandler();

handler.get(async (req, res) => {
  await prisma.exam.create({
    data: {
      name: 'Número cor',
      nameSlug: 'numero-cor',
      description:
        'Os números quando vistos, pensados ou ouvidos causam percepções de cores.',
      trials: ['1', '2', '3'],
      trialsCount: 10,
      status: 'active',
    },
  });
  return res.status(200).json({
    message: 'test',
  });
});

export default handler;
