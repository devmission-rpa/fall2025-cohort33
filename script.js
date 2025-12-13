"use strict";
// Airtable Data
const traineesUrl =
  "https://api.airtable.com/v0/appYhupTrQTaKrYSM/Trainees?view=Grid%20view";
const programLeaderURL =
  "https://api.airtable.com/v0/appYhupTrQTaKrYSM/Program%20leaders?view=Grid%20view";
const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer patcfYwoAsbXE25FJ.59ca26a3811ad1ec9cc1804153bdfd5ff54e09828a8f27a6e62d93ebb83e8f60`,
  },
};
function addRecordToHTML(record, html) {
  let name = record.fields["Name"];
  let info = record.fields["Description"];
  let openTo = record.fields["OpenTo"];
  let linkedln = record.fields["Linkedin"];
  let pic = record.fields["Headshots"]?.[0]?.url || "";
  let webapp = record.fields["App"];
  html += `
          <div class="student-name-tag">
            <img src="name-tag.png" class="name-tag">
            <div class="student-info">
              <a href="${webapp}" target="_blank"><img src="${pic}" class="headshot"></a>
              <h5 class="name">${name}</h5>
              <span class="open-to-badge">Open to: ${openTo}</span>
              <p class="highlight">${info}</p>
              <a href="${linkedln}" target="_blank" class="linkedin">
                <h5>Linked</h5>
                <img src="linkedin.png" alt="LinkedIn Icon">
              </a>
            </div>
          </div>
        `;
  return html;
}
async function getAllStudentsRecords() {
  let getResultElement = document.getElementById("js-students-name-tag");
  const loadingElement = document.querySelector(".loading");
  await fetch(traineesUrl, options)
    .then((response) => response.json())
    .then((data) => {
      loadingElement.style.display = "none";
      console.log(JSON.stringify(data, null, 2));
      let newHTML = "";
      getResultElement.innerHTML = newHTML;
      const repeat = data.records.length * 2;
      for (let j = 0; j < repeat; j++) {
        let i = j % data.records.length;
        newHTML = addRecordToHTML(data.records[i], newHTML);
      }
      getResultElement.innerHTML = newHTML;
    });
  setTimeout(autoScroll, 1000);
}
getAllStudentsRecords();
// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("js-teachers-name-tag");
  await fetch(programLeaderURL, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
      getResultElement.innerHTML = "";
      let newHTML = "";
      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["Name"];
        let occupation = data.records[i].fields["Occupation"];
        let info = data.records[i].fields["SmallDescription"];
        let pic = data.records[i].fields["Headshots"]?.[0]?.url || "";
        newHTML += `
          <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div class="teacher-name-tag card p-3 text-center">
              <img src="${pic}" class="teacher-headshot card-img-top mx-auto">
              <div class="card-body teacher-card-body">
                <h5 class="teacher-name card-title">${name}</h5>
                <p class="teacher-title text-muted">${occupation}</p>
                <p class="teacher-info card-text">${info}</p>
              </div>
            </div>
          </div>
        `;
      }
      getResultElement.innerHTML = newHTML;
    });
}
function autoScroll() {
  const students = document.getElementById("js-students-name-tag");
  students.style.scrollBehavior = "auto";
  // const repeatLength = 5186.25;
  const width = students.scrollWidth;
  const dx = 1;
  const dt = 20;
  let interval;
  const startScroll = () => {
    scrolling = true;
    interval = setInterval(() => {
      students.scrollLeft += dx;
      // console.log(students.scrollLeft);
      // if (students.scrollLeft >= repeatLength) {
      if (students.scrollLeft >= width / 2) {
        clearInterval(interval);
        students.scrollLeft = 0;
        console.log("reset autoScroll");
        setTimeout(startScroll, dt);
      }
    }, dt);
  };
  let scrolling = false;
  startScroll();
  students.addEventListener("click", () => {
    if (scrolling) {
      console.log("click stopped scrolling");
      clearInterval(interval);
      scrolling = false;
    } else {
      console.log("click started scrolling");
      startScroll();
    }
  });
}
getAllRecords();
