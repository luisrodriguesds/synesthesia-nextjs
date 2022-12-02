import { apiHandler } from '../../../server/main';
import { AuthService } from '../../../server/modules/auth/authService';

const handler = apiHandler();

handler.post(async (req, res) => {
  const auth = await AuthService.loginUser(req.body);
  return res.status(200).json(auth);
});

export default handler;
