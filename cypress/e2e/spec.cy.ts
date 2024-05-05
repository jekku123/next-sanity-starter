describe("Basic layout test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Visits the frontpage and checks that the main components are in place", () => {
    cy.get("header").should("be.visible").should("exist");
    cy.get("main").should("be.visible").should("exist");
    cy.get("footer").should("be.visible").should("exist");
  });
  it("Test the scroll top button", () => {
    cy.scrollTo("bottom");
    cy.get('[data-test-id="scroll-top"]').click();
    cy.get("html").should("have.prop", "scrollTop", 0);
  });
});

describe("Navigation tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Visit articles page, test teaser link to navigate to single article and come back using previous page button", () => {
    cy.get('[data-test-id="articles"]').click();
    cy.url().should("include", "articles");
    cy.get("h1").contains("Articles");

    cy.get('[data-test-id="articles/article-1"]').click();
    cy.url().should("include", "article-1");

    cy.get('[data-test-id="previous-page-button"]').click();
    cy.url().should("include", "articles");
  });

  it("Test nested navigation", () => {
    cy.get('[data-test-id="nested-1"]').click();
    cy.get('[data-test-id="nested-1/nested-2"]').click();
    cy.url().should("include", "nested-2");
    cy.get("h1").contains("Nested");
  });
});
