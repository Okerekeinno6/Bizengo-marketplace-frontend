import { BaseService } from "../baseApi";

class UserService extends BaseService {
  constructor() {
    super('/user')
  }

  async getProfile(accessToken?: string) {
    try {
      const raw = await fetch(
        `${this.baseUrl}/profile`,
        {
          headers: {
            ...this.headers,
            // Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            Authorization: `Bearer ${accessToken}`
          },
        }
      );

      const res = await raw.json();
      return res
    } catch (err) {
      console.log("🚀 ~ UserService ~ profile ~ err:", err)
    }
  }
}

export const userService = new UserService()
