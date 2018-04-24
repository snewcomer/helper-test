import { helper } from '@ember/component/helper';

function round(number, base) {
  let intPart = Math.floor(number / (1000 * base));
  let remaining = (number - intPart * 1000 * base) / base;
  if (remaining > 949) {
    return intPart + 1;
  }
  return remaining < 50 ? intPart : intPart + Math.round(remaining / 100) / 10;

}
export function abbrNumber(number) {
  if (number === undefined || number === null) {
    return null;
  }
  if (number < 1000) {
    return number;
  } else if (number < 999950) {
    return `${round(number, 1)}K`;
  } else if (number < 1000000000) {
    return `${round(number, 1000)}M`;
  } else {
    let num = round(number, 1000000);
    if (num >= 1000) {
      let digits = String(1000).split('');
      digits.splice(-3, 0, ',');
      return `${digits.join('')}B`;
    }
    return `${num}B`;
  }
}

export default helper(function _abbrNumber([number]) {
  return abbrNumber(number);
});
