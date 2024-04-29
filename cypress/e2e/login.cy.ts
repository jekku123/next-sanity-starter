const login = (email: string, password: string) => {
  cy.visit("/auth/login");
  email && cy.get('[data-test-id="login-form-email"]').type(email);
  password && cy.get('[data-test-id="login-form-password"]').type(password);
  cy.get('[data-test-id="login-form-login-button"]').click();
};

const testUser = {
  email: "testuser@mail.com",
  password: "password123",
};

describe("Login tests", () => {
  it("Check login form exist and has needed elements", () => {
    cy.visit("/auth/login");
    cy.get('[data-test-id="login-form"]').should("exist");
    cy.get('[data-test-id="login-form-email"]').should("exist");
    cy.get('[data-test-id="login-form-password"]').should("exist");
    cy.get('[data-test-id="login-form-forgot-password"]').should("exist");
    cy.get('[data-test-id="login-form-login-button"]').should("exist");
  });

  it("Check login with empty email and password", () => {
    login("", "");
    cy.get('[data-test-id="login-form"]')
      .should("contain.text", "Email is required")
      .should("contain.text", "Password is required");
  });

  it("Check login with correct email and empty password", () => {
    login(testUser.email, "");
    cy.get('[data-test-id="login-form"]')
      .should("contain.text", "Password is required")
      .should("not.contain.text", "Email is required");
  });

  it("Check login with empty email and correct password", () => {
    login("", testUser.password);
    cy.get('[data-test-id="login-form"]')
      .should("contain.text", "Email is required")
      .should("not.contain.text", "Password is required");
  });

  it("Check login with incorrect credentials", () => {
    login(testUser.email, "notcorrectpassword");
    cy.get('[data-test-id="form-error"]').should("exist");
    cy.get('[data-test-id="form-error"]').should(
      "contain.text",
      "Invalid credentials!",
    );
  });

  it("Check login with correct credentials", () => {
    login(testUser.email, testUser.password);
    cy.url().should("eq", "http://localhost:3000/");
  });
});
