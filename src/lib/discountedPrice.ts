export  const discountedPrice = (Price: number,coins:number) => {
    return Price * 10 - (coins / 5 / 100) * (Price * 10);
  };
