
// <reference types="Cypress"/>

describe('Central de atendimento ao Cliente TAT', function () {
    const nome = 'Patrícia';
    const sobrenome = 'Barcellos';
    const email = 'patricia@email.com';
    const telefone = '49999999999';
    const tresSegundos = 3000
    const longText = Cypress._.repeat('a', 255);// aqui foi aplicado o lodash para gerar um testo longo usando repeat

    beforeEach(() => {
        cy.visit('./src/index.html');

    })
    //! Lesson 01
    it('#0 - verifica o titulo da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    })

    //! Lesson 02
    Cypress._.times(3, () => { //Lesson 11 uso de lodash: aqui ta sendo usado para repetir o teste 3 vezes, com o objetivo de provar que o teste passa todas as vezes
        it('#1 - preenche os campos obrigatórios e envia o formulário', () => {

            //!Lesson 11: uso do cy.clock e cy.tick - ao final na aula avançada mostra como validar uma mensagem que tem um tempo de exibição
            cy.clock(); /**Aqui já chamado o cy.clock para congelar o relogio do navegador */
            cy.get('#firstName').type(nome, { delay: 0 });
            cy.get('#lastName').type(sobrenome, { delay: 0 });
            cy.get('#email').type(email, { delay: 0 });
            cy.get('#open-text-area').type(longText, { delay: 0 });

            // cy.get('button[type="submit"]').click();
            cy.contains('button', 'Enviar').click()

            cy.get('.success').should('be.visible');

            cy.tick(tresSegundos);/**Aqui avança o relogio do navegador para 3 segundos */
            cy.get('.success').should('not.be.visible');

        })
    })

    it('#2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock();
        cy.get('#firstName').type(nome, { delay: 0 });
        cy.get('#lastName').type(sobrenome, { delay: 0 });
        cy.get('#email').type('email@errado,com', { delay: 0 });
        cy.get('#open-text-area').type('teste', { delay: 0 });

        // cy.get('button[type="submit"]').click();
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible');

        cy.tick(tresSegundos);
        cy.get('.error').should('not.be.visible');
    })
    it('#3 - campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone').type('telefone')
            .should('have.value', '');
    })

    it('#4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock();
        cy.get('#firstName').type(nome, { delay: 0 });
        cy.get('#lastName').type(sobrenome, { delay: 0 });
        cy.get('#email').type(email, { delay: 0 });
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('teste', { delay: 0 });

        // cy.get('button[type="submit"]').click();
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible');

        cy.tick(tresSegundos);
        cy.get('.error').should('not.be.visible');
    })

    it('#5 - preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type(nome, { delay: 0 })
            .should('have.value', nome)
            .clear()
            .should('have.value', '');

        cy.get('#lastName')
            .type(sobrenome, { delay: 0 })
            .should('have.value', sobrenome)
            .clear()
            .should('have.value', '');

        cy.get('#email')
            .type(email, { delay: 0 })
            .should('have.value', email)
            .clear()
            .should('have.value', '');

        cy.get('#phone')
            .type(telefone)
            .should('have.value', telefone)
            .clear()
            .should('have.value', '');

    })

    it('#6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        //cy.get('button[type="submit"]').click();
        cy.clock();
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible');

        cy.tick(tresSegundos);
        cy.get('.error').should('not.be.visible');
    })

    it('#7 - envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock();
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');

        cy.tick(tresSegundos);
        cy.get('.success').should('not.be.visible');
    })

    //! Lesson 03
    it('#8 - seleciona um produto (Youtube) por seu **texto** no combo', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube');
    });

    it('#9 - seleciona um produto (Mentoria) por seu **valor** no option html', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria');
    });

    it('#10 - seleciona um produto (Blog) por seu **indice** no option html', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog');
    });

    //! Lesson 04
    //? Nessa aula é aplicado o uso de .each para realizar alguma iteração diversas vezes
    //? e cy.wrap para empacotar a iteração e fazer algum uso como uma validação

    it('#11 - marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback');
    });

    it('#12 - marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check();
                cy.wrap($radio).should('be.checked');
            })
    });

    //! Lesson 05
    //? Nessa aula aplica o uso de .last() para desmarcar o ultimo elemento marcado.
    it('#13 -  marc ambos os checkboxes, depois desmarca o ultimo', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked');
    });

    //! Lesson 06
    //? Upload de arquivos com cypress com selectFile
    //? abaixo nos 3 testes são usado 3 tipos para validar se o objeto
    //? file trás o arquivo com nome example.json

    //* esse teste usa o then para validar
    it('#14 - seleciona um arquivo da pasta fixture', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json');
            })
    });

    //* Outra forma de validar é usar should com função onde passa input no formato jquery
    it('#15 - seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json');
            })
    });

    //* Outra forma é usar só o should passar o input sem formato jquery
    it('#16 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('exampleFile')
        cy.get('input[type="file"]')
            .selectFile('@exampleFile')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json');
            })
    });

    //! Lesson 07
    //? LINKS que abrem em outra aba do navegador
    //? 1 valida target
    //? 2 valida usando .invoke()
    //? 3 

    it('#17 - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank');
    });

    it('#18 - acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click();

        cy.contains('Talking About Testing').should('be.visible');

    });

    it('#19 - testa a página da política de privacidade de forma independente', () => {
        cy.get('#privacy a').should('have.attr', 'href', 'privacy.html');
    });

    it('#20 - exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
            
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('#21 - preenche a area de texto usando o comando invoke', () => {
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)

            /*
            * Com .invoke() dá pra simular um ctrl v no text area, seria uma forma mais rapida de
            * de preencher campos, mais rapido que usar o .type({delay:0}) 
             */
    })

    it('#22 - faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should((response)=>{
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    })

    it.only('#23 - desafio final, encontrar o gato escondido usando conhecimento aprendido no curso', () =>{
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')

        // outro uso de invoke() subsituir texto

        cy.get('#title')
        .invoke('text', 'CAT TAT')

        cy.get('#subtitle')
        .invoke('text','Eu 💜 gatos também!')
    })

})
