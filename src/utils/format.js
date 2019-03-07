export const addDecimalAndCommas = value => {
  return (Number(value) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export const getFormattedCurrency = amount => {
  const formattedAmount = addDecimalAndCommas(amount)

  return `$${formattedAmount}`
}
