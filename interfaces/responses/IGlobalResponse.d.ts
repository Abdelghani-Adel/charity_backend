// ApiResponse.ts
interface IGlobalResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export default IGlobalResponse;
