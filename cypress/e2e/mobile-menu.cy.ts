describe("Mobile menu tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Mobile menu toggle is not visible on desktop", () => {
    cy.get("[data-test-id='mobile-menu-toggle']").should("not.be.visible");
  });

  it("Mobile menu toggle is visible on mobile", () => {
    cy.viewport("iphone-6");
    cy.get("[data-test-id='mobile-menu-toggle']").should("be.visible");
  });

  it("Open / close", () => {
    cy.viewport("iphone-6");
    cy.get("[data-test-id='mobile-menu-toggle']").click();
    cy.get("[data-test-id='mobile-menu']").should("exist");
    cy.get("[data-test-id='mobile-menu-toggle']").click();
    cy.get("[data-test-id='mobile-menu']").should("not.exist");
  });

  it("Check that mobile menu closes when clicking on a link", () => {
    cy.viewport("iphone-6");
    cy.get("[data-test-id='mobile-menu-toggle']").click();
    cy.get("[data-test-id='mobile-menu'] a").first().click();
    cy.get("[data-test-id='mobile-menu']").should("not.be.visible");
  });
});
