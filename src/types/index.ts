export interface TelegramData {
  identifier: string;
  msg: string;
  user?: any;
  origin?: string;
}

export interface TelegramEvent extends MessageEvent {
  data: TelegramData;
}

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: (
          params: { bot_id: number; request_access: string },
          callback: (data: any) => void
        ) => void;
      };
    };
  }
}

export {};
