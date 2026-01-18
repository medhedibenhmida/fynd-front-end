import {ActivityApprovalStatus} from '../enums/ActivityApprovalStatus';
import {ActivityLifecycleState} from '../enums/ActivityLifecycleState';
import {User} from './User';

export interface IActivity {
  id: number;
  title: string;
  description: string;
  location?: string | null;
  type: string;
  created_at?: string;
  updated_at?: string;
  activityApprovalStatus?:ActivityApprovalStatus;
  activityLifecycleState?: ActivityLifecycleState;
  creator?:User;
  isPrivate?:boolean
  maxParticipants?:String;
  genderPreference?:String;
  notes?:String;
}
