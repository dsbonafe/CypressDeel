/// <reference types="cypress" />
const contract = {
  name: "My First Deel Contract",
  taxResidence: "Brazil",
  taxState: "Minas Gerais",
  jobTitle: "Quality Assurance Specialist",
  seniorityLevel: "Senior",
  scopeOfWork:
    "Automate contract creation just to show that I know how to automate",
  specialCaluse: "I am very very special.",
};

const getYesterdayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!

  let ddy = today.getDate() - 1;
  if (ddy < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return ddy + "/" + mm + "/" + yyyy;
};

describe("Create a contract", () => {
  before(() => {
    cy.login();
  });
  context("Should create a contract", () => {
    it("Go to Create a Fix Contract", () => {
      cy.get(
        ".mobile-header-content-container > .button > :nth-child(1) > .flex > svg > path",
        {
          timeout: 10000,
        }
      ).click();
      cy.contains("Create A Contract", {
        timeout: 1000,
      }).click({
        force: true,
      });
      cy.contains("Fixed Rate").click({
        force: true,
      });
    });
    it("Feel the date to yesterday", () => {
      cy.get(".deel-ui__calendar-input-container__input_content_value").then(
        ($dateValuePlace) => {
          $dateValuePlace[0].innerHTML = getYesterdayDate();
        }
      );
    });
    it("Fill the rest of the form and continue", () => {
      cy.get("input[name=name]").type(contract.name);
      cy.get("#react-select-2-input").type(contract.taxResidence);
      cy.get("#react-select-2-input").type("{enter}");
      cy.get("#react-select-4-input", {
        timeout: 10000,
      }).type("Minas");
      cy.get("#react-select-4-input").type("{enter}");
      cy.get("[name=jobTitle]").type(contract.jobTitle);
      cy.contains(contract.jobTitle).click({
        force: true,
      });
      cy.get("#react-select-3-input").type(contract.seniorityLevel);
      cy.get("#react-select-3-input").type("{enter}");
      cy.get("[name=scope]").type(contract.scopeOfWork);
      cy.get('[data-qa="next"]').click({
        force: true,
      });
    });
    it("Define payment as GBP 1000 weekly", () => {
      cy.get("#react-select-5-input", {
        timeout: 10000,
      }).type("gbp");
      cy.get("#react-select-5-input").type("{enter}");
      cy.get("[name=rate]").type("1000");
      cy.get("#react-select-6-input", {
        timeout: 1000,
      }).type("Weekly");
      cy.get("#react-select-6-input").type("{enter}");
      cy.get('[data-qa="next"]').click({
        force: true,
      });
    });
    it("Confirm Creation", () => {
      cy.get('[data-qa="next"]').click({
        force: true,
      });
    });
    it("Add a special clause", () => {
      cy.get(":nth-child(4) > .box > .flex > :nth-child(2) > .button").click();
      cy.get(".textarea").type(contract.specialCaluse);
      cy.get('[data-qa="next"]').click({
        force: true,
      });
    });
    it("Finish Creation", () => {
      cy.get('[data-qa="create-contract"]').click({
        force: true,
      });
    });
  });
});
