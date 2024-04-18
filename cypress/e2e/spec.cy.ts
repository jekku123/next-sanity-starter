describe("basic layout test", () => {
  it("Visits the frontpage and checks that the main components are in place", () => {
    cy.visit("http://localhost:3000");
    cy.get("header").should("be.visible").should("exist");
    cy.get("main").should("be.visible").should("exist");
    cy.get("footer").should("be.visible").should("exist");
  });
});

describe("dark mode and light mode", () => {
  it("Visits the frontpage and checks that the light and dark modes work", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-test-id="mode-toggle"]').click();
    cy.get('[data-test-id="lightmode-button"]').click();
    cy.get("html").should("have.class", "light");

    cy.get('[data-test-id="mode-toggle"]').click();
    cy.get('[data-test-id="darkmode-button"]').click();
    cy.get("html").should("have.class", "dark");
  });
});
