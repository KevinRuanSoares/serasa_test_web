export interface Authentication {
  email: string;
  password: string;
}


export interface AuthenticatedRefresh {
  token: string;
}


export interface Authenticated {
  token: string;
  email: string;
  name: string;
  roles: string[];
}

export interface ValidateCode {
  email: string;
  code: string;
}

export interface VerifiedCode {
  verifed_code: string;
  result: 'OK';
}

export interface RecoverPassword extends ValidateCode {
  password: string;
}

export interface ResultOk {
  result: 'OK';
}

export interface Register {
  name: string;
  email: string;
  phone: string;
  cnpj: string | null;
  terms_use_privacy: boolean;
  password: string;
}
