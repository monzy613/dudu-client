/**
 * @providesModule ddutil
 */

/**
 * 判断手机号是否合理
 */
const isMobileLegal = number => {
  const re = /^(1(3|4|5|7|8))\d{9}$/
  return re.test(number)
}

export {
  isMobileLegal,
}
