import type { TelegramData, TelegramEvent } from "./types";

const BOT_ID: number = parseInt(process.env.BOT_ID || "0", 10);
const IDENTIFIER: string = process.env.IDENTIFIER || "";

const authTelegram = (event: TelegramEvent): void => {
  if (!event?.data) return;

  const { data } = event;
  if (data.identifier !== IDENTIFIER) return;

  if (data.msg === "auth_login_telegram") {
    telegram(data).catch(console.error);
  }
};

const telegram = (param: TelegramData): Promise<TelegramData> => {
  return new Promise((resolve, reject) => {
    if (param.identifier !== IDENTIFIER) {
      return reject("Identifier does not match");
    }

    window.Telegram.Login.auth(
      { bot_id: BOT_ID, request_access: "write" },
      (data) => {
        if (!data) {
          window.parent.postMessage(null, "*");
          return reject("Failed authentication");
        }

        const msgParam: TelegramData = {
          identifier: IDENTIFIER,
          user: data,
          msg: "auth_login_telegram",
          origin: window.location.origin,
        };

        window.parent.postMessage(msgParam, "*");
        resolve(msgParam);
      }
    );
  });
};

window.removeEventListener("message", authTelegram);
window.addEventListener("message", authTelegram);
