export function intFormatter(value: any) {
  const regex = /(0(?!\d+)|[1-9]{1}\d*)/gm
  const result = value.match(regex)

  if (result !== null) {
    return result[0]
  } else {
    return '0'
  }
}
