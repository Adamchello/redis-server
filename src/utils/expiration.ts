export const AVAILABLE_EXPIRY_TYPES = ['EX', 'PX', 'EXAT', 'PXAT']

export const getExpiryTimeInMilliseconds = (type: string, expiryDuration: number) => {
  const currentTimestamp = new Date().getTime()

  switch (type) {
    case 'PXAT':
      return expiryDuration
    case 'EXAT':
      return expiryDuration * 1000
    case 'PX':
      return currentTimestamp + expiryDuration
    case 'EX':
      return currentTimestamp + expiryDuration * 1000
    default:
      return 0
  }
}
