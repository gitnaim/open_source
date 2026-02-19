window.addEventListener("load", function () {
  let navList = document.querySelectorAll("nav > ul > li");

  for (let i = 0; i < navList.length; i++) {
    navList[i].addEventListener("click", function (e) {
      e.preventDefault();

      if (e.currentTarget.classList.contains("active")) {
        e.currentTarget.classList.remove("active");

        let sub = e.currentTarget.lastElementChild;

        gsap.to(sub, {
          height: 0,
          duration: 0.3,
          onComplete: function () {
            sub.removeAttribute("style");
          },
        });
      } else {
        for (let j = 0; j < navList.length; j++) {
          if (j === i) {
            navList[j].classList.add("active");

            let sub = navList[j].lastElementChild;

            gsap.fromTo(
              sub,
              { display: "block", height: 0 },
              { height: "auto", duration: 0.3 },
            );
          } else {
            navList[j].classList.remove("active");

            let sub = navList[j].lastElementChild;

            gsap.to(sub, {
              height: 0,
              duration: 0.3,
              onComplete: function () {
                sub.removeAttribute("style");
              },
            });
          }
        }
      }
    });
  }
});
