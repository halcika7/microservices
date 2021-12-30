import jwt_decode from 'jwt-decode';

export interface DecodedToken {
  readonly id: number | undefined;
  readonly exp: number;
}

export class AuthToken {
  readonly decodedToken: DecodedToken;

  constructor(private readonly token: string) {
    this.decodedToken = jwt_decode(token);
  }

  private expiresAt(): Date {
    return new Date(this.decodedToken.exp * 1000);
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt();
  }

  get isAuthenticated(): boolean {
    return !this.isExpired;
  }

  get authorizationString() {
    return `Bearer ${this.token}`;
  }
}
