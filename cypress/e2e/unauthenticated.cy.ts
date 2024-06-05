describe("Authorization tests as logged out", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Check that middleware protected route is not accessible", () => {
    cy.visit("/protected");
    cy.url().should("eq", "http://localhost:3000/auth/login");
  });

  it("Check that hidden menu item is not visible", () => {
    cy.get('[data-test-id="hidden"]').should("not.exist");
  });

  it("Check that contact form is not shown at frontpage", () => {
    cy.get('[data-test-id="contact-form"]').should("not.exist");
  });

  it("Check that usermenu button is not shown", () => {
    cy.get('[data-test-id="user-menu-button"]').should("not.exist");
  });
});
