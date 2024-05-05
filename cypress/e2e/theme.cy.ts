describe("Dark mode and light mode", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Check light mode", () => {
    cy.get('[data-test-id="mode-toggle"]').click();
    cy.get('[data-test-id="lightmode-button"]').click();
    cy.get("html").should("have.class", "light");
  });

  it("Check dark mode", () => {
    cy.get('[data-test-id="mode-toggle"]').click();
    cy.get('[data-test-id="darkmode-button"]').click();
    cy.get("html").should("have.class", "dark");
  });

  it("Theme persists on reload", () => {
    cy.get('[data-test-id="mode-toggle"]').click();
    cy.get('[data-test-id="darkmode-button"]').click();
    cy.reload();
    cy.get("html").should("have.class", "dark");
    cy.get('[data-test-id="mode-toggle"]').click();
    cy.get('[data-test-id="lightmode-button"]').click();
    cy.reload();
    cy.get("html").should("have.class", "light");
  });
});
