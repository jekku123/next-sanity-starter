describe("Basic layout test", () => {
  it("Visits the frontpage and checks that the main components are in place", () => {
    cy.visit("/");
    cy.get("header").should("be.visible").should("exist");
    cy.get("main").should("be.visible").should("exist");
    cy.get("footer").should("be.visible").should("exist");
  });
});

describe("Dark mode and light mode", () => {
  it("Check light mode", () => {
    cy.visit("/");
    cy.get('[data-test-id="mode-toggle"]').click();
    cy.get('[data-test-id="lightmode-button"]').click();
    cy.get("html").should("have.class", "light");
  });

  it("Check dark mode", () => {
    cy.visit("/");
    cy.get('[data-test-id="mode-toggle"]').click();
    cy.get('[data-test-id="darkmode-button"]').click();
    cy.get("html").should("have.class", "dark");
  });
});

describe("Navigation tests", () => {
  it("Visit articles page, test teaser link to navigate to single article and come back using previous page button", () => {
    cy.visit("/");
    cy.get('[data-test-id="articles"]').click();
    cy.url().should("include", "articles");
    cy.get("h1").contains("Articles");

    cy.get('[data-test-id="articles/article-1"]').click();
    cy.url().should("include", "article-1");
    cy.get("h1").contains("Article 1");

    cy.get('[data-test-id="previous-page-button"]').click();
    cy.url().should("include", "articles");
  });

  it("Test nested navigation", () => {
    cy.visit("/");
    cy.get('[data-test-id="nested"]').click();
    cy.get('[data-test-id="nested/nested"]').click();
    cy.url().should("include", "nested");
    cy.get("h1").contains("Nested");
  });
});
