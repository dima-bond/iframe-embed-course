const button = document.querySelector("button");
const result = document.querySelector(".result");

console.log("Widget origin:", window.location.origin);

button.addEventListener("click", () => {
  const terrain = document.querySelector('input[name="terrain"]:checked')?.value;
  result.textContent = terrain
    ? `Selected terrain: ${terrain}.`
    : "Choose a terrain type first.";
});
