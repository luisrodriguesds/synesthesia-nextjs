import { apiHandler } from '../../server/main';

const handler = apiHandler();

handler.get(async (req, res) => {
  res.status(200).json({
    message: 'API is alive',
  });
});

export default handler;
