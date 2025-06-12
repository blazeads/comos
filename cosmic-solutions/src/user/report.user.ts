import '../css/report.style.css'
import { headerActions, loadHeader } from '../components/header';
import { popUp, popupActions } from '../components/popup';
import { loadSidebar, sidebarActions } from '../components/sidebar';
import { createReport } from '../lib/get-reports';
import { loadSpinner, spinnerActionsAdd, spinnerActionsRemove } from '../components/spinner';
import Endpoints from '../lib/endpoint';

const reportPage = document.querySelector<HTMLDivElement>('#app')!
const container = document.createElement("div");
const jsonUser = localStorage.getItem("user") as string;

if (!jsonUser) {
  localStorage.clear();
  window.location.href = "/"
}

const userDetails = JSON.parse(jsonUser);

export const loadUserReport = () => {
  return (
    container.innerHTML = `
      <div class="wrapper">
        <div class="panel">
          <h1>Report A New Issue</h1>
          <div class="panel-info">
            <h2>[ Computer No.:${userDetails.pc} ]</h2>
            <h2>[ Room No.:${userDetails.room} ]</h2>
            <h2>[ Cosmos.:none ]</h2>
          </div>
        </div>
        <div class="form-container">
          <form>
            <div>
                <h2 class="label">Choose Issue Category</h2>
                <div class="radio-group">
                  <div>
                    <input type="radio" id="network" name="category" value="network">
                    <label for="network">Network</label><br>
                  </div>
                  <div>
                    <input type="radio" id="software" name="category" value="software">
                    <label for="software">Software</label><br>
                  </div>
                  <div>
                    <input type="radio" id="hardware" name="category" value="hardware">
                    <label for="hardware">Hardware</label>
                  </div>
                </div>
            </div>
            <div class="description-container">
              <h2 class="label">Describe The Issue</h2>
              <textarea id="description"></textarea>
            </div>
            <div class="action-btns">
              <button class="btn-submit" id="btn-submit">Submit Report</button>
              <button class="btn-cancel" id="btn-cancel">Cancel</button>
            </div>
          </form>
        </div>
        <div class="arlet">
          <p id="message"></p>
        </div>
      </div>
    `
  )
}

reportPage.innerHTML += loadHeader("Support Request Portal");
reportPage.innerHTML += loadSidebar();
reportPage.innerHTML += loadUserReport();
reportPage.innerHTML += loadSpinner()
headerActions();
sidebarActions();

const submitBtn = document.getElementById("btn-submit");
const cancleBtn = document.getElementById("btn-cancel");
const cats = document.getElementsByName("category") as any;
const description = document.getElementById("description") as HTMLTextAreaElement;
let category = "";
let message = document.getElementById("message") as HTMLParagraphElement;

submitBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  spinnerActionsAdd()
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].checked) {
      category = cats[i].value
    }
  }

  if (category == "" && description.value == "" || category == "" || description.value == "") {
    message.innerText = "Make sure to complete your report!"
    const timout = setTimeout(() => {
      message.innerText = ""
      clearTimeout(timout)
    }, 3000)
    return;
  }

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let tokenNumber = getRandomIntInclusive(10, 99).toString() + getRandomIntInclusive(10, 99).toString()

  const data = {
    tokenID: tokenNumber,
    category: category,
    description: description.value,
    status: "open",
    submittedOn: new Date().toLocaleString("en-ZA", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).toLowerCase(),
    notes: "",
    pc: userDetails.pc,
    room: userDetails.room
  }

  const res = await createReport(Endpoints.createReportUrl, data);
  if (!res?.ok) {
    return
  } else {
    popUp("Success", `<p>TokenID: ${tokenNumber}</p><br><p>Categoty: ${category}</p><br><p>Description: ${description.value}</p><br><p>Submitted On: ${new Date().toLocaleString("en-ZA", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).toLowerCase()}</p><br>`)
    popupActions();

  }
  spinnerActionsRemove()
});

cancleBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../pages/dashboard.user.html"
})
