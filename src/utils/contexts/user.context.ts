import { JwtPayloadType } from 'src/auth/types/jwt-payload.type';

export class UserContext {
  private static _currentUser: JwtPayloadType | null;

  public static get currentUser(): JwtPayloadType | null {
    return this._currentUser;
  }

  public static set currentUser(user: JwtPayloadType | null) {
    this._currentUser = user;
  }
}
