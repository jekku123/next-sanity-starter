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

  it("Check middleware protected route", () => {
    cy.visit("/protected");
    cy.get("h1").contains("Protected route");
  });

  it("Check protected sanity page", () => {
    cy.visit("/authgate");
    cy.get("h1").contains("AuthGate");
  });

  it("Check that protected menu item is visible and works", () => {
    cy.get('[data-test-id="hidden"]').should("exist");
    cy.get('[data-test-id="hidden"]').click();
    cy.url().should("include", "hidden");
    cy.get("h1").contains("Hidden");
  });

  it("Check that contact form is shown at frontpage", () => {
    cy.get('[data-test-id="contact-form"]').should("exist");
  });

  it("Check that usermenu button is shown", () => {
    cy.get('[data-test-id="user-menu-button"]').should("exist");
  });

  it("Check that user stays logged in after refresh", () => {
    cy.reload();
    cy.get('[data-test-id="user-menu-button"]').should("exist");
  });
});

describe("Authorization tests as logged out", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Check that middleware protected route is not accessible", () => {
    cy.visit("/protected");
    cy.url().should("eq", "http://localhost:3000/auth/login");
  });

  it("Check that protected sanity page is not accessible", () => {
    cy.visit("/authgate");
    cy.get('[data-test-id="form-error"]').should("exist");
  });

  it("Check that protected menu item is not visible", () => {
    cy.get('[data-test-id="hidden"]').should("not.exist");
  });

  it("Check that contact form is not shown at frontpage", () => {
    cy.get('[data-test-id="contact-form"]').should("not.exist");
  });

  it("Check that usermenu button is not shown", () => {
    cy.get('[data-test-id="user-menu-button"]').should("not.exist");
  });
});
