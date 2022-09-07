const e=document.querySelector("form");e.addEventListener("submit",(t=>{t.preventDefault();let o=[];document.querySelectorAll("[data-id]").forEach((e=>{let t=e.getAttribute("data-id");const n=[];e.querySelectorAll("input").forEach((e=>{e.checked&&n.push(e.name)})),o.push(`${t}=${n.join(",")}`)})),window.open(e.action+"?"+o.join("&"),"_self")}));
//# sourceMappingURL=index.00e4b0fc.js.map
