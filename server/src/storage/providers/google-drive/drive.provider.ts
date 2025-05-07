import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

export const GOOGLE_DRIVE_CLIENT = 'DRIVE_CLIENT';

export const DriveProvider: Provider = {
  provide: GOOGLE_DRIVE_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const auth = new google.auth.OAuth2(
      configService.get<string>('GOOGLE_CLIENT_ID'),
      configService.get<string>('GOOGLE_CLIENT_SECRET'),
      configService.get<string>('GOOGLE_REDIRECT_URI')
    );

    auth.setCredentials({
      refresh_token: configService.get<string>('GOOGLE_REFRESH_TOKEN'),
    });

    return google.drive({ 
      version: 'v3', 
      auth 
    });
  },
};