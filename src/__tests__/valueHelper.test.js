import {
  joinValues,
  sanitizeNumInput,
  removeAllLeadingZeros,
  sliceLeadingZero,
  removeLastChar,
  stringToNum,
  getPercentAsDecimal,
  formatValueToDecimal,
  dollarsToPennies,
  penniesToDollars,
} from '../valueHelper'

describe('joinValues::', () => {
  it('should join the values when prev and next provided', () => {
    const prev = '102'
    const next = '4'
    const res = joinValues(prev, next)
    expect(res).toEqual('1024')
  })

  it('should return prev when there is no next', () => {
    const prev = '102'
    const res = joinValues(prev)
    expect(res).toEqual('102')
  })

  it('validate long values of any string value', () => {
    const prev = '10ab20cd'
    const next = '7889'
    const res = joinValues(prev, next)
    expect(res).toEqual('10ab20cd7889')
  })
})

describe('sanitizeNumInput::', () => {
  it('should sanitize input removing decimal', () => {
    const val = '1.02'
    const res = sanitizeNumInput(val)
    expect(res).toEqual('102')
  })
})

describe('removeAllLeadingZeros::', () => {
  it('should remove leading zeros', () => {
    const val = '00102'
    const res = removeAllLeadingZeros(val)
    expect(res).toEqual('102')
  })

  it('should remove only leading zeros', () => {
    const val = '0000050001000'
    const res = removeAllLeadingZeros(val)
    expect(res).toEqual('50001000')
  })
})

describe('sliceLeadingZero::', () => {
  it('should only slice the leading zero, test1', () => {
    const val = '0111'
    const res = sliceLeadingZero(val)
    expect(res).toEqual('111')
  })

  it('should only slice the leading zero, test2', () => {
    const val = '10000'
    const res = sliceLeadingZero(val)
    expect(res).toEqual('10000')
  })
})

describe('removeLastChar::', () => {
  it('should remove the last character from the string', () => {
    const val = '18451'
    const res = removeLastChar(val)
    expect(res).toEqual('1845')
  })
})

describe('stringToNum::', () => {
  it('should cnvert a string number to a number', () => {
    const val = '18451'
    const res = stringToNum(val)
    expect(res).toEqual(18451)
  })

  it('should cnvert a large string number to a number', () => {
    const val = '180050000'
    const res = stringToNum(val)
    expect(res).toEqual(180050000)
  })
})

describe('getPercentAsDecimal::', () => {
  it('should convert a percent into a decimal, test1', () => {
    const percent = 10
    const val = 100
    const res = getPercentAsDecimal(percent, val)
    expect(res).toEqual(10)
  })

  it('should convert a percent into a decimal, test2', () => {
    const percent = 18
    const val = 45
    const res = getPercentAsDecimal(percent, val)
    expect(res).toEqual(8.1)
  })
})

describe('formatValueToDecimal::', () => {
  it('should format a number to decimal string, test1', () => {
    const val = 18.4569
    const res = formatValueToDecimal(val)
    expect(res).toEqual('18.46')
  })

  it('should format a number to decimal string, test2', () => {
    const val = 184569
    const res = formatValueToDecimal(val)
    expect(res).toEqual('184569.00')
  })

  it('should return 0.00 when no value passed', () => {
    const res = formatValueToDecimal()
    expect(res).toEqual('0.00')
  })
})

describe('dollarsToPennies::', () => {
  it('should convert a dollar string value to pennies', () => {
    const val = '$45.24'
    const res = dollarsToPennies(val)
    expect(res).toEqual(4524)
  })
})

describe('penniesToDollars::', () => {
  it('should convert pennies to dollars when amount is less than 100', () => {
    const val = 45
    const res = penniesToDollars(val)
    expect(res).toEqual('0.45')
  })

  it('should convert pennies to dollars when amount is less than 100', () => {
    const val = 4524
    const res = penniesToDollars(val)
    expect(res).toEqual('45.24')
  })
})
