import { Create, Delete, Read, Update } from '../models/user.interface';
import { User } from '../models/user.model';

export interface UserService
  extends Create<User>,
    Read<User>,
    Update<User>,
    Delete {}
{
}
