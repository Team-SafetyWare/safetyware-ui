/// <reference types="cypress" />

///import Chance from "chance";
///const chance = new Chance();

describe("LoginTests", () => {
  ///const email = chance.email();
  ///const pass = "Password";

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("has text", () => {
    cy.contains("Log In");
  });

  it("prevents userless login", () => {
    cy.wait(1000);
    cy.get('button[id="loginbuttonauth"]').click();
    cy.contains("Incorrect password.");
  });

  it("allows demo login", () => {
    cy.wait(1000);
    cy.get('button[id="loginbuttondemo"]').click();
    cy.contains("Dashboard");
  });
});
