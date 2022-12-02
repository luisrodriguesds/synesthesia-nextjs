import { apiHandler } from '../../../server/main';
import { UserService } from '../../../server/modules/user/userService';

const handler = apiHandler();

handler.post(async (req, res) => {
  const user = await UserService.createUser(req.body);
  return res.status(200).json({
    user,
  });
});

export default handler;
