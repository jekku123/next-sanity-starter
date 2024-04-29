const loginUser = (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit("/auth/login");
    cy.get('[data-test-id="login-form-email"]').type(email);
    cy.get('[data-test-id="login-form-password"]').type(password);
    cy.get('[data-test-id="login-form-login-button"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
};

describe("Authorization tests as logged in", () => {
  beforeEach(() => {
    loginUser("testuser@mail.com", "password123");
    cy.visit("/");
  });

  it("Check protected route", () => {
    login("testuser@mail.com", "password123");
    cy.visit("/protected");
  });
});
