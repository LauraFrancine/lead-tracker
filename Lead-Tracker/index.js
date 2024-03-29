let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deletEL = document.getElementById("delete-btn");
const leadsFromLocalStore = JSON.parse(localStorage.getItem("myLeads"));
const tabEl = document.getElementById("tab-btn");

tabEl.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

if (leadsFromLocalStore) {
  myLeads = leadsFromLocalStore;
  render(myLeads);
}

function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    listItems += `
       <li>
         <a target = '_blank' href='${leads[i]}'> ${leads[i]}</a>
        </li>  
          `;
  }
  ulEl.innerHTML = listItems;
}

deletEL.addEventListener("dblclick", function () {
  console.log("double clicked");
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = " ";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
