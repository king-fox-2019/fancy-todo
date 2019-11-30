let landingpage = $("#landing-page")[0];
let count = 40;
for (let i = 0; i < 40; i++) {
  let gooeyBox = document.createElement("div");
  gooeyBox.className = "box";
  landingpage.appendChild(gooeyBox);
}

setInterval(() => {
  let gooey = $(".box");
  for (let i = 0; i < gooey.length; i++) {
    gooey[i].style.left = Math.floor(Math.random() * 90) + "vw";
    gooey[i].style.top = Math.floor(Math.random() * 80) + "vh";
  }
}, 2000);
