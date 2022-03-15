
Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

Cypress.Commands.add("login", () => {
    cy.fixture("setupConfig").then((config) => {
      // Get environment
      let env = config["chosen_env"];
      let cfg = config["envs"];
      let myEnv = cfg[env];
      let url = myEnv["baseUrl"];
      expect(url).to.not.be.null;
      Cypress.config().baseUrl = url
  
      // Visit the page
      cy.visit(url);
  
      // Perform login
      cy.get('#mui-1').type(myEnv["user"])
      cy.get('#mui-2').type(myEnv["password"])
      cy.get(`[data-qa="log-in"]`).click()
    });
  });