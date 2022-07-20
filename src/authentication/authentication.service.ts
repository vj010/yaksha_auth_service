import { AppContextAuthenticationService } from 'src/interfaces/app_context_auth_service.interface';
import { GoogleOAuthConfig } from 'src/types/googleOAuthConfig';
import querystring from 'querystring';

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

  async login(code: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  registerUser(): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
