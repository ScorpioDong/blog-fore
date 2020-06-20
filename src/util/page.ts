
export const toTop = () => {
  let toTopTimer = setInterval(function() {
    let top = document.body.scrollTop || document.documentElement.scrollTop;
    let speed = top / 4;
    if (document.body.scrollTop != 0) {
      document.body.scrollTop -= speed;
    } else {
      document.documentElement.scrollTop -= speed;
    }
    if (top == 0) {
      clearInterval(toTopTimer);
    }
  }, 30);
};

export const toTopNow = () => {
  if (document.body.scrollTop != 0) {
    document.body.scrollTop = 0;
  } else {
    document.documentElement.scrollTop = 0;
  }
};

