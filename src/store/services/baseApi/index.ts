
export class BaseService {
   baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

   headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  constructor(resource: string) {
    this.baseUrl += resource
  }
}