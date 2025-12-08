import { Team } from ".";


export interface Profile {
  id: number;
  jobTitle: null | string;
  businessName: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  streetAddress1: string;
  streetAddress2: null | string;
  city: string;
  countryId: number;
  zipCode: string;
  hasVerifiedEmail: boolean;
  profilePhotoUrl: string;
  state: null | string;
  country: {
    countryName: string;
    countryId: number;
    countryCode: string;
    countryDialCode: string;
  };
  doesHomeService: boolean;
  roles: string;
}

export enum Role {
  ADMIN = 1,
  MANAGER = 2,
  STAFF = 3,
  CLIENT = 4,
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  id: string;
  first_name: string;
  last_name: string;
  nickname?: string;
  email: string;
  role?: Role[]
  is_active: boolean;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
  token?: string
  isAdmin?: boolean;
}

export interface userResponse {
    _id: string
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    nickname?: string,
    address: string,
    phoneNumber: string,
    position?: string,
    isCaptain: boolean,
    isOwner: boolean,
    otpVerified: false,
    location: {
        type: string,
        coordinates: [number, number]
    },
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  email: string;
  phone_number: string;
  user_id: string;
  email_verified: boolean;
  phone_verified: boolean;
  profile: object;
  user: {
    id: string,
    firstName: string;
    lastName: string;
    email: string;
    token?: string;
    hasRegisteredProduct: boolean;
  };
}

export interface forgotPasswordResponse {
  success: boolean;
  message: string;
}
export interface logoutResponse {
  success: boolean;
  message: string;
}

export interface MatchSession {
  _id: string
  session: string
  teamOne?: Team
  teamTwo?: Team
  teamOneScore: number
  teamTwoScore: number
  initials?: string
  matchType: string
  isStarted: boolean
  __v: number
}

export interface AllSessionsResponse {
  pagination: {
    limit: number
    page: number
    total: number
    totalPages: number
  }
  sessions: MatchSession[]
}