/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        cy.visit('./src/index.html')

    })
    

    it('verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        
        cy.get('#firstName').type('Felipe')
        cy.get('#lastName').type('Baruch')
        cy.get('#email').type('f.baruch@dino.com.br')
        cy.get('#open-text-area').type('Este é um exercicio do curso de cypress', {delay: 0})
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('#firstName').type('Felipe')
        cy.get('#lastName').type('Baruch')
        cy.get('#email').type('gfdgdgdg')
        cy.get('#open-text-area').type('Este é um exercicio do curso de cypress', {delay: 0})
        cy.get('.button').click()
        cy.get('.error > strong').should('be.visible')

    })

    it('validar campo de telefone', function() {

        cy.get('#phone').type('asihasufhfs')
        cy.get('#phone').should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.get('#firstName').type('Felipe')
        cy.get('#lastName').type('Baruch')
        cy.get('#email').type('f.baruch@dino.com.br')
        cy.get('#open-text-area').type('Este é um exercicio do curso de cypress', {delay: 0})
        cy.get('#phone-checkbox').check()
        cy.get('.button').click()
        cy.get('.error > strong').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        cy.get('#firstName').type('Felipe').should('have.value', 'Felipe').clear().should('have.value', '')
        cy.get('#lastName').type('Baruch').should('have.value', 'Baruch').clear().should('have.value', '')
        cy.get('#email').type('f.baruch@dino.com.br').should('have.value', 'f.baruch@dino.com.br').clear().should('have.value', '')
        cy.get('#open-text-area').type('Este é um exercicio do curso de cypress', {delay: 0}).should('have.value', 'Este é um exercicio do curso de cypress').clear().should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('71993318426').should('have.value', '71993318426').clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.get('.button').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto', function() {

        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('marca o tipo de atendimento "Feedback"', function() {

        cy.get('#support-type > :nth-child(2) > input').check().should('be.checked')
        cy.get(':nth-child(4) > input').check().should('be.checked')
        cy.get(':nth-child(3) > input').check().should('be.checked')
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {

        cy.get('#check input[type="checkbox"]').as('checkboxes').check()

        cy.get('@checkboxes').each(checkbox => {expect(checkbox[0].checked).to.equal(true)})

        cy.get('#check input[type="checkbox"]').last().uncheck()

        cy.get('#check input[type="checkbox"]').last().should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function() {

        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json').should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {

        cy.get('input[type="file"]').should('not.have.value').selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}).should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile').should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {

        cy.get('a').should('have.attr', 'target', '_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {

        cy.get('#privacy a').invoke('removeAttr', 'target')
        cy.get('#privacy a').click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    
  })