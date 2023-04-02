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
    cy.get("#phone-checkbox").check();
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
  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("select#product").select("YouTube").should("have.value", "youtube");
  });
  it("seleciona um produto (Mentoria) por seu value", () => {
    cy.get("select#product")
      .select("mentoria")
      .should("have.value", "mentoria");
  });
  it("seleciona um produto (Blog) por seu indice", () => {
    cy.get("select#product").select(1).should("have.value", "blog");
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get("input[type='radio'][value='feedback']")
      .check()
      .should("have.value", "feedback");
  });
  it("marca cada tipo de atendimento", () => {
    cy.get("input[type='radio']")
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last('input[type="checkbox"]')
      .uncheck()
      .should("not.be.checked");
  });
  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("input[type='file']")
      .selectFile("./cypress/fixtures/example.json")
      .then((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("input[type='file']")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .then(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json", { encoding: null }).as("exampleFile");
    cy.get("input[type='file']")
      .selectFile("@exampleFile")
      .then((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get('a[href="privacy.html"]').should("have.attr", "target", "_blank");
  });
  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get('a[href="privacy.html"]').invoke("removeAttr", "target").click();
    cy.contains("CAC TAT - Política d privacidade").should("be.visible");
  });
});
