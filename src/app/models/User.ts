import {Role} from '../enums/Role';
import {UserStatus} from '../enums/UserStatus';

export interface User {
  id?: number;
  uuid?: string;
  firstName: string;
  lastName: string;
  age?: number;
  email: string;
  phone?: string;
  password: string;
  role?: Role;
  userStatus?: UserStatus;
  selfieUrl?: string;
  documentUrl?: string;
  created_at?: string;
  updated_at?: string;
  profilePicture?: string;
}
