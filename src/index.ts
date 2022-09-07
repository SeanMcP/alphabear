const form = document.querySelector("form")!;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let params: string[] = [];

  document.querySelectorAll("[data-id]").forEach((fieldset) => {
    let param = fieldset.getAttribute("data-id")!;
    const values = [];
    fieldset.querySelectorAll("input").forEach((input) => {
      if (input.checked) {
        values.push(input.name);
      }
    });
    params.push(`${param}=${values.join(",")}`);
  });

  window.open(form.action + "?" + params.join("&"), "_self");
});
