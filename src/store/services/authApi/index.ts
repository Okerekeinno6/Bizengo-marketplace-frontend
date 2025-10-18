import { BaseService } from "../baseApi";
import { ILoginRequest } from "./types";

class AuthService extends BaseService {
  constructor() {
    super('/auth')
  }

  async login(req: ILoginRequest) {
    try {
      const raw = await fetch(
        `${this.baseUrl}/login`,
        {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(req),
        }
      );

      const res = await raw.json();
      return res
    } catch (err) {
      console.log("🚀 ~ AuthService ~ login ~ err:", err)
    }
  }
}

export const authService = new AuthService()