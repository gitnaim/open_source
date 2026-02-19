document.addEventListener("DOMContentLoaded", () => {
  const containerBox = document.querySelector(".container_box");
  const menuLinks = document.querySelectorAll(".container_box_item > a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (link.classList.contains("active")) {
        return;
      }

      menuLinks.forEach((el) => el.classList.remove("active"));
      link.classList.add("active");
      containerBox.classList.add("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".container")) {
      containerBox.classList.remove("active");
      menuLinks.forEach((link) => link.classList.remove("active"));
    }
  });
});
