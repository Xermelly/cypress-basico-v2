/// <reference types="Cypress" />
describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("preencher os campos obrigatorios e envia o formulario", () => {
    cy.get("#firstName").type("Christopher", { delay: 0 });
    cy.get("#lastName").type("Santos", { delay: 0 });
    cy.get("#email").type("meuemail@gmail.com", { delay: 0 });
    cy.get("#open-text-area").type("Estou apenas testando", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#email").type("meuemailgmail.com", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });
  it("validar campo telefone", () => {
    cy.get("#phone").type("meucelular", { delay: 0 }).should("have.value", "");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Christopher", { delay: 0 });
    cy.get("#lastName").type("Santos", { delay: 0 });
    cy.get("#email").type("meuemail@gmail.com", { delay: 0 });
    cy.get("#open-text-area").type("Estou apenas testando", { delay: 0 });
    cy.get("#phone-checkbox").click();
    cy.contains("button", "Enviar").click();
    cy.get(".error > strong").should(
      "have.text",
      "Valide os campos obrigatórios!"
    );
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Christopher", { delay: 0 })
      .should("have.value", "Christopher")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Santos", { delay: 0 })
      .should("have.value", "Santos")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("meuemail@gmail.com", { delay: 0 })
      .should("have.value", "meuemail@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("998257902", { delay: 0 })
      .should("have.value", "998257902")
      .clear()
      .should("have.value", "");
  });
  it("exibe a mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error > strong").should(
      "have.text",
      "Valide os campos obrigatórios!"
    );
  });
  it("envia o formulário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });
});
