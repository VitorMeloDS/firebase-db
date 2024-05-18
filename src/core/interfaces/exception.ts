interface Exception {
  message: string
  status: number
}

export function isException(object: any): object is Exception {
  return 'message' in object && 'status' in object
}
