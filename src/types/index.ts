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
