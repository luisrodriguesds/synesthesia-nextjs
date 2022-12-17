import { ensureAuthMiddleware } from '../../server/common/middlewares/ensureAuth';
import { apiHandler } from '../../server/main';

const handler = apiHandler();

handler.get(ensureAuthMiddleware, async (req, res) => {
  res.status(200).json({
    message: 'API is alive',
  });
});

export default handler;
