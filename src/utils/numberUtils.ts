export const toPersianNumbers = (text: string | number): string => {
    if(!text) return ""
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    
    return text
      .toString()
      .split('')
      .map(char => {
        const number = parseInt(char);
        return isNaN(number) ? char : persianNumbers[number];
      })
      .join('');
  };

  export const priceSeparator = (number:number) => {
    if(!number) return "0";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }