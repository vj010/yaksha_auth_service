export interface MethodReturnValue<T> {
  success: boolean;
  data: T;
  error: any;
  message?: string;
}
