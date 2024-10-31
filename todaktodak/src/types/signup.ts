export interface SignupForm {
  name: string;
  nickname: string;
  email: string;
  address: {
    zipcode: string;
    address1: string;
    address2: string;
  };
  password: string;
  passwordConfirm: string;
  profileImage?: string;
  agreements: boolean[];
}
