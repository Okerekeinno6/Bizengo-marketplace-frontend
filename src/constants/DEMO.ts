type DemoValueType = 0 | 1

type DemoType = {
  loader?: DemoValueType,
  portal?: DemoValueType,
  formData?: DemoValueType,
  action?: DemoValueType,
}
export const DEMO: Record<string, DemoType> = {
  auth: {
    formData: 1,
  }
} as const