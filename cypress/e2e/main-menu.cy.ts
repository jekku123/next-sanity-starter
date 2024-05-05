describe("Main menu tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Main menu is visible on desktop", () => {
    cy.viewport("macbook-15");
    cy.get("[data-test-id='main-menu']").should("be.visible");
  });

  it("Main menu is not visible on mobile", () => {
    cy.viewport("iphone-6");
    cy.get("[data-test-id='main-menu']").should("not.be.visible");
  });
});
