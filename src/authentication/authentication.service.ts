import axios from 'axios';
import querystring from 'querystring';
import { AppContextAuthenticationService } from 'src/interfaces/app_context_auth_service.interface';
import { MethodReturnValue } from 'src/interfaces/method_return_value.interface';
import { IUser } from 'src/interfaces/user_model.interface';
import { GoogleTokenResponse } from 'src/types/google-token-reponse';
import { GoogleOAuthConfig } from 'src/types/googleOAuthConfig';

export class AuthenticationService implements AppContextAuthenticationService {
  private oAuthConfig: GoogleOAuthConfig;
  constructor(googleOAuthConfig: GoogleOAuthConfig) {
    this.oAuthConfig = googleOAuthConfig;
  }

  async getLoginUrl(): Promise<string> {
    const rootUrl = this.oAuthConfig.authRootUrl;
    const options = {
      redirect_uri: this.oAuthConfig.redirectUrl,
      client_id: this.oAuthConfig.googleClientId,
      access_type: this.oAuthConfig.accessType,
      response_type: this.oAuthConfig.responseType,
      prompt: this.oAuthConfig.prompt,
      scope: this.oAuthConfig.scope.join(' '),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
  }

  async login(code: string): Promise<MethodReturnValue<any>> {
    const googleTokeRes: GoogleTokenResponse = await this.getGoogleAuthTokens(
      code,
    );
    if (!googleTokeRes?.access_token) {
      return {
        data: null,
        success: false,
        error: null,
        message: 'could not get access token',
      };
    }
    const userInfo: IUser = await this.getGoogleUserInfo(
      googleTokeRes?.access_token,
    );
    if (!userInfo)
      return {
        data: null,
        success: false,
        error: null,
        message: 'could not get user info',
      };
    return { data: userInfo, success: true, error: null };
  }

  async logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  registerUser(): void | Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getGoogleAuthTokens(code: string): Promise<GoogleTokenResponse> {
    const url = this.oAuthConfig.googleTokenUrl;
    const values = {
      code,
      client_id: this.oAuthConfig.googleClientId,
      client_secret: this.oAuthConfig.googleClientSecret,
      redirect_uri: this.oAuthConfig.redirectUrl,
      grant_type: this.oAuthConfig.grantType,
    };
    try {
      const { data } = await axios.post<GoogleTokenResponse>(
        url,
        querystring.stringify(values),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`google api responded with:${error.code}`);
    }
  }

  async getGoogleUserInfo(accessToken: string): Promise<IUser> {
    try {
      const { data } = await axios.get<IUser>(
        `${this.oAuthConfig.profileInfoUrl}?alt=json&access_token=${accessToken}`,
      );
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`google api responded with:${error.code}`);
    }
  }
}
