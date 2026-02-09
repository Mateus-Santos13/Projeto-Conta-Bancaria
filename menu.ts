import leia from "readline-sync";//import readline sync para leitura de dados do teclado
import { colors } from './src/util/Colors';//importando o arquivo colors.ts
import { Conta } from "./src/model/Conta";
import { Input } from "./src/input/Input";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";
import { formatarMoeda } from "./src/util/Currency";

//Criar um objeto global da classe ContaController
const contas = new ContaController();

//Criar um array contendoos tipos de conta;
const tipoContas = ['Conta Corrente', 'Conta Poupanca'];

export function main() {

    let opcao: number;

    criarContasTeste();//Chama a função para criar contas de teste;

    while (true) {
        //Aqui entra os console log do menu com as configurações de cor
        console.log(colors.bg.black, colors.fg.magenta);// Cor de fundo preta e cor da fonte magenta
        console.log("============================================================");
        console.log(`
╔╗ ┌─┐┌┐┌┌─┐┌─┐  ╔═╗┌─┐┌┐┌┌┬┐┌─┐┌─┐  ╔╗ ┬─┐┌─┐┌─┐┬┬
╠╩╗├─┤││││  │ │  ╚═╗├─┤│││ │ │ │└─┐  ╠╩╗├┬┘├─┤└─┐││
╚═╝┴ ┴┘└┘└─┘└─┘  ╚═╝┴ ┴┘└┘ ┴ └─┘└─┘  ╚═╝┴└─┴ ┴└─┘┴┴─┘
`);
        console.log("============================================================");

        console.log(colors.fg.cyan);
        console.log("┌────────────────────── MENU ────────────────────────┐");
        console.log("│                                                    │");
        console.log("│  1 ─ Criar conta                                   │");
        console.log("│  2 ─ Listar todas as contas                        │");
        console.log("│  3 ─ Buscar conta por número                       │");
        console.log("│  4 ─ Atualizar dados da conta                      │");
        console.log("│  5 ─ Apagar conta                                  │");
        console.log("│                                                    │");
        console.log("│  6 ─ Sacar                                         │");
        console.log("│  7 ─ Depositar                                     │");
        console.log("│  8 ─ Transferir valor entre contas                 │");
        console.log("│  9 ─ Buscar conta por nome do titular              │");
        console.log("│                                                    │");
        console.log("│  0 ─ Sair                                          │");
        console.log("│                                                    │");
        console.log("└────────────────────────────────────────────────────┘");

        console.log(colors.reset);// Reseta as cores
        console.log(colors.fg.yellow);// Cor da fonte amarela
        console.log("\n➜ Escolha uma opção desejada: ");// Escolha uma opção
        opcao = Input.questionInt("");// Leitura da opção do teclado

        if (opcao == 0) {
            console.log("\nBanco Santos Brasil, o seu banco de confiança!");
            sobre();
            process.exit(0);
        }
        switch (opcao) { //Opções do menu
            case 1:
                console.log("\nCriar Conta");
                criarConta();
                keyPress();
                break;
            case 2:
                console.log("\nListar todas as contas");
                contas.listarTodas();
                keyPress();
                break;
            case 3:
                console.log("\nBuscar conta por número");
                buscarContaPorNumero();
                keyPress();
                break;
            case 4:
                console.log("\nAtualizar dados da conta");
                atualizarConta();
                keyPress();
                break;
            case 5:
                console.log("\nApagar conta");
                deletarContaPorNumero();
                keyPress();
                break;
            case 6:
                console.log("\nSacar");
                sacar();
                keyPress();
                break;
            case 7:
                console.log("\nDepositar");
                depositar();
                keyPress();
                break;
            case 8:
                console.log("\nTransferir valor entre contas");
                transferir();
                keyPress();
                break;
            case 9:
                console.log("\nBuscar conta por titular");
                buscarContaPorTitular();
                keyPress();
                break;
            default:
                console.log("Opção inválida!");
                keyPress();
                break;
        }
    }
}

//Opção 1: Função para cadastrar os dados da conta;

function criarConta() {

    console.log("Digite o número da agência: ");

    const agencia = Input.questionInt("");

    console.log("Digite o nome do titular: ");

    const titular = Input.question("");

    console.log("Selecione o tipo da conta: ");

    console.log("1 - Conta Corrente");
    console.log("2 - Conta Poupanca");

    const tipo = Input.keyInSelect(tipoContas, "", { cancel: false }) + 1;

    console.log("Digite o saldo da conta: ");

    const saldo = Input.questionFloat("");

    switch (tipo) {
        case 1:
            //Conta Corrente
            console.log("Digite o limite da conta: ");
            const limite = Input.questionFloat("");
            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, titular, tipo, saldo, limite));
            break;
        case 2:
            //Conta Poupanca
            console.log("Digite o dia do aniversário da conta: ");
            const diaAniversario = Input.questionInt("");
            if (diaAniversario >= 1 && diaAniversario <= 31) {
                contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, titular, tipo, saldo, diaAniversario));
            }
            break;
        default:
            console.log("Tipo de conta inválido!");
            break;
    }
}

//opção 2 - Listar todas as contas;
//já está criado na classe contaController;

//Opção nova - buscar conta por titular
function buscarContaPorTitular(): void {
    console.log("Digite o nome do titular da conta: ");
    const titular = Input.question("");
    contas.procurarPorTitular(titular);
}

//opção 3 - Procurar uma conta pelo número;
function buscarContaPorNumero(): void {
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    contas.procurarPorNumero(numero);
}
//opção 4 - Atualizar dados da conta;
function atualizarConta(): void {

    // Solicita o número da conta
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    // Verifica se a conta existe
    const conta = contas.buscarNoArray(numero);

    // Se a conta existir...
    if (conta !== null) {

        /**
         * Guarda os valores atuais da conta em variáveis
         * Exceto tipo que não será aramazenado em uma constante
         * porque não terá o seu valor modificado
         */
        let agencia: number = conta.agencia;
        let titular: string = conta.titular;
        const tipo: number = conta.tipo;
        let saldo: number = conta.saldo;

        /**
         * Atualização da Agência
         * 
         * 1. Exibe o valor atual da agência
         * 2. Se pressionar ENTER o valor atual será mantido
         * 3. Para o ENTER funcionar, passamos o parâmetro
         *    default input, que indica o valor padrão (solução mais simples)
         * 4. Caso contrário o valor atual será substituído
         * 5. Como estamos usando o  método questionInt, 
         *    a validação dos dados está garantida
         * 
         * Os demais atributos seguirão a mesma lógica, alterando
         * apenas a função de input, de acordo com o tipo.
         */
        console.log(`\nAgência atual: ${agencia}`);
        console.log("Digite o novo número da agência: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        agencia = Input.questionInt("", { defaultInput: agencia });

        // Atualização da Titular
        console.log(`\nTitular atual: ${titular}`);
        console.log("Digite o novo nome do titular: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        titular = Input.question("", { defaultInput: titular });

        // Atualização do Saldo
        console.log(`\nSaldo atual: ${formatarMoeda(saldo)}`);
        console.log("Digite o valor do novo saldo: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        saldo = Input.questionFloat("", { defaultInput: saldo });

        // Atualização do Tipo
        switch (tipo) {
            case 1: // Conta Corrente

                /**
                 * Como o objeto 'conta' é do tipo genérico Conta, 
                 * precisamos converter o objeto (casting) para o tipo 
                 * ContaCorrente.
                 * Isso é necessário porque apenas a classe ContaCorrente 
                 * possui o atributo 'limite'.
                 * Após o casting, conseguimos acessar o atributo limite.
                 * O mesmo será feito com o atributo aniversario da classe
                 * ContPoupanca
                 */
                let limite: number = (conta as ContaCorrente).limite;

                // Atualização do Limite
                console.log(`\nLimite atual: ${formatarMoeda(limite)}`);
                console.log("Digite o valor do novo limite: ");
                console.log("(Pressione ENTER para manter o valor atual)");
                limite = Input.questionFloat("", { defaultInput: limite });

                /**
                * Na atualização não utilizamos o método gerarNumero() no atributo 'numero'.
                * O número da conta já existe e identifica unicamente essa conta.
                * 
                * Se chamarmos o método 'gerarNumero()', um novo número seria criado e 
                * substituiria o antigo, o que impediria a atualização dos dados.
                * 
                * O mesmo vale para a classe ContaPoupanca
                */
                contas.atualizar(new ContaCorrente(numero, agencia, titular, tipo, saldo, limite));
                break;

            case 2: // Conta Poupança

                let aniversario: number = (conta as ContaPoupanca).diaAniversario;

                // Atualização do Aniversário
                console.log(`\nAniversário Atual: ${aniversario}`);
                console.log("Digite o novo dia do aniversário: ");
                console.log("(Pressione ENTER para manter o valor atual)");
                aniversario = Input.questionInt("", { defaultInput: aniversario });

                contas.atualizar(new ContaPoupanca(numero, agencia, titular, tipo, saldo, aniversario));

                break;
        }

    } else {
        console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);
    }
}

//opção 5 - Deletar uma conta pelo número;
function deletarContaPorNumero(): void {
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");
    const conta = contas.procurarPorNumero(numero);

    if (conta !== null) {
        console.log("Tem certeza que deseja deletar essa conta?");
        const confirmar = Input.keyInSelect(["Sim", "Nao"], "", { cancel: false }) + 1; //Confirmação de exclusão para segurança dos dados;

        if (confirmar === 2) {
            console.log("Operação cancelada!");
            return;
        }
        contas.deletar(numero);
    }
}

function sacar(): void {
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");
    const conta = contas.procurarPorNumero(numero);
    if (conta !== null) {
        console.log("Digite o valor a ser sacado: ");
        const valor = Input.questionFloat("");
        contas.sacar(numero, valor);
    } else {
        console.log(colors.fg.red, `A conta número ${numero} nao foi encontrada.`, colors.reset);
    }
}

function depositar(): void {
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");
    const conta = contas.procurarPorNumero(numero);
    if (conta !== null) {
        console.log("Digite o valor a ser depositado: ");
        const valor = Input.questionFloat("");
        contas.depositar(numero, valor);
    } else {
        console.log(colors.fg.red, `A conta número ${numero} nao foi encontrada.`, colors.reset);
    }
}
function transferir(): void {
    console.log("Digite o número da conta de origem: ");
    const numeroOrigem = Input.questionInt("");
    console.log("Digite o número da conta de destino: ");
    const numeroDestino = Input.questionInt("");
    const contaOrigem = contas.procurarPorNumero(numeroOrigem);
    const contaDestino = contas.procurarPorNumero(numeroDestino);

    if (contaOrigem === null) {
        console.log(colors.fg.red, `A conta de origem número ${numeroOrigem} nao foi encontrada.`, colors.reset);
    } else if (contaDestino === null) {
        console.log(colors.fg.red, `A conta de origem número ${numeroDestino} nao foi encontrada.`, colors.reset);
    } else {
        console.log("Digite o valor a ser transferido: ");
        const valor = Input.questionFloat("");
        contas.transferir(numeroOrigem, numeroDestino, valor);
    }
}



//Função sobre, apenas mostra os dados da pessoa que desenvolveu (Eu);
export function sobre(): void {
    console.log("\n************************************");
    console.log("Projeto desenvolvido por: ");
    console.log("Mateus Santos");
    console.log("mateus.santos.eng.elt@gmail.com");
    console.log("https://github.com/Mateus-Santos13");
    console.log("************************************");
}

//Função de pausa entre as opções do menu;
function keyPress(): void {
    console.log("\nPressione ENTER para continuar...");
    Input.prompt();
}

function criarContasTeste(): void {

    // Instâncias da Classe ContaCorrente
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 'Amanda Magro', 1, 1000000.00, 100000.00));
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 'João da Silva', 1, 1000.00, 100.00));

    // Instâncias da Classe ContaPoupança
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, "Geana Almeida", 2, 10000, 10));
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, "Jean Lima", 2, 15000, 15));
}

main();