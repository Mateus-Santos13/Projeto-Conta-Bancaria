import leia from "readline-sync";//import readline sync para leitura de dados do teclado
import { colors } from './src/util/Colors';//importando o arquivo colors.ts
import { Conta } from "./src/model/Conta";
import { Input } from "./src/input/Input";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/model/controller/ContaController";

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
        console.log("│                                                    │");
        console.log("│  9 ─ Sair                                          │");
        console.log("│                                                    │");
        console.log("└────────────────────────────────────────────────────┘");

        console.log(colors.reset);// Reseta as cores
        console.log(colors.fg.yellow);// Cor da fonte amarela
        console.log("\n➜ Escolha uma opção desejada: ");// Escolha uma opção
        opcao = Input.questionInt("");// Leitura da opção do teclado

        if (opcao == 9) {
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
                keyPress();
                break;
            case 7:
                console.log("\nDepositar");
                keyPress();
                break;
            case 8:
                console.log("\nTransferir valor entre contas");
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


//opção 3 - Procurar uma conta pelo número;
function buscarContaPorNumero(): void {
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    contas.procurarPorNumero(numero);
}
//opção 4 - Atualizar dados da conta;
function atualizarConta(): void {
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    const conta = contas.buscarNoArray(numero);//devolve o objeto da conta;
    if (conta !== null) {

        //Dessa forma, não é necessário atualizar TODOS os dados da conta, apenas os que o usuário quiser atualizar;
        //Guardando os valores existentes da conta em variáveis;
        let agencia = conta.agencia;
        let titular = conta.titular;
        const tipo = conta.tipo;
        let saldo = conta.saldo;

        //Atualização do dado agencia
        console.log(`\nAgência atual: ${agencia}`);
        console.log("Digite a nova agência: \n(Pressione ENTER para manter o valor atual)");
        let entrada = Input.question("");

        agencia = entrada.trim() === "" ? agencia : parseInt(entrada);//Verifica se o valor digitado foi vazio ou não e atribui a variável. Também converte string para int;

        //Atualização do dado titular
        console.log(`\nTitular atual: ${titular}`);
        console.log("Digite o novo titular: \n(Pressione ENTER para manter o valor atual)");
        entrada = Input.question("");

        titular = entrada.trim() === "" ? titular : entrada;//Verifica se o valor digitado foi vazio ou não e atribui a variável;

        //Atualização do dado saldo
        console.log(`\nSaldo atual: ${saldo}`);
        console.log("Digite o novo saldo: \n(Pressione ENTER para manter o valor atual)");
        entrada = Input.question("");

        saldo = entrada.trim() === "" ? saldo : parseFloat(entrada.replace(",", "."));
        //Verifica se o valor digitado foi vazio ou não e atribui a variável. Também converte string para float. Também substitui 
        // o ponto pelo virgulinha para evitar problemas com o parseFloat;

        //Verificação do tipo da conta
        switch (tipo) {
            case 1:{
                //Atualização dos dados da Conta Corrente
                //Conta Corrente
                let limite = (conta as ContaCorrente).limite; //"as" para dizer que o tipo da variável eh ContaCorrente
                console.log(`\nLimite atual: ${limite}`);
                console.log("Digite o novo limite: \n(Pressione ENTER para manter o valor atual)");
                entrada = Input.question("");

                limite = entrada.trim() === "" ? limite : parseFloat(entrada.replace(",", "."));

                contas.atualizar(new ContaCorrente(numero, agencia, titular, tipo, saldo, limite));
                break;
            }
            case 2:{
                //Atualização dos dados da Conta Poupanca
                //Conta Poupanca
                let diaAniversario = (conta as ContaPoupanca).diaAniversario;//"as" para dizer que o tipo da variável eh ContaPoupanca

                console.log(`\nAniversário atual: ${diaAniversario}`);
                console.log("Digite a nova data de aniversário: \n(Pressione ENTER para manter o valor atual)");
                let entrada = Input.question("");

                diaAniversario = entrada.trim() === "" ? diaAniversario : parseInt(entrada);//Igual feito na agencia;
                //Para verificar se a data fica entre 1 e 31, dá pra fazer um while(true) e break quando a data estiver entre 1 e 31, depois eu faço isso;
                contas.atualizar(new ContaPoupanca(numero, agencia, titular, tipo, saldo, diaAniversario));

                break;
            }
        }
    } else {
        console.log(colors.fg.red, `\nConta de número ${numero} não encontrada!`, colors.reset);
    }

}
//opção 5 - Deletar uma conta pelo número;
function deletarContaPorNumero(): void {
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    console.log("Tem certeza que deseja deletar essa conta?");
    const confirmar = Input.keyInSelect(["Sim", "Nao"], "", { cancel: false }) + 1; //Confirmação de exclusão para segurança dos dados;

    if (confirmar === 2) {
        console.log("Operação cancelada!");
        return;
    }
    contas.deletar(numero);
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