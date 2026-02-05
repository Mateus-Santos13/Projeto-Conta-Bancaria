import leia from "readline-sync";//import readline sync para leitura de dados do teclado
import { colors } from './src/util/Colors';//importando o arquivo colors.ts
import { Conta } from "./src/model/Conta";
import { Input } from "./src/model/Input";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";



export function main(){

    let opcao: number;


    //instanciar objetos da classe conta
    //numero da conta, agencia, titularm tipo e saldo;
    //const c1 = new Conta(1, 1234, "Mateus", 1, 100000.00);

    // //Testes do Método Sacar
    // console.log("Sacar 100,00: ", c1.sacar(100.00));
    // console.log("Sacar 200000.00: ", c1.sacar(200000.00));
    // console.log("Sacar 0,00: ", c1.sacar(0.00));
    

    // //Testes do Método Depositar
    // console.log("Depositar -10.00: ");
    // c1.depositar(-10.00);

    // console.log("Depositar 500.00: ");
    // c1.depositar(500.00);

    // c1.visualizar();

    //Testes da classe ContaCorrente

    const cc1 = new ContaCorrente(2, 5678, "Bianca", 1, 200000.00, 2000.00);//Instanciando um objeto da classe ContaCorrente

    //teste do método sacar - Conta corrente;
    console.log("Sacar 1000,00: ", cc1.sacar(1000.00));
    console.log("Sacar 200000.00: ", cc1.sacar(200000.00));
    cc1.depositar(500.00);

    cc1.visualizar();

    //Testes da classe ContaPoupanca

    const cp1 = new ContaPoupanca(3, 9012, "Lúcia", 2, 300000.00, 12);//Instanciando um objeto da classe ContaPoupanca
    cp1.visualizar();


    while(true){
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
        
        if(opcao == 9){
            console.log("\nBanco Santos Brasil, o seu banco de confiança!");
            sobre();
            process.exit(0);
        }

    switch(opcao){ //Opções do menu
        case 1:
            console.log("\nCriar Conta");
            console.log("Digite um nome com acento: ");
            let nome = Input.question("");
            console.log(nome);
            keyPress();
            break;
        case 2: 
            console.log("\nListar todas as contas");
            keyPress();
            break;
        case 3:
            console.log("\nBuscar conta por número");
            keyPress();
            break;
        case 4:
            console.log("\nAtualizar dados da conta");
            keyPress();
            break;
        case 5:
            console.log("\nApagar conta");
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

export function sobre(): void{//Função sobre, apenas mostra os dados da pessoa que desenvolveu (Eu)
    console.log("\n************************************");
    console.log("Projeto desenvolvido por: ");
    console.log("Mateus Santos");
    console.log("mateus.santos.eng.elt@gmail.com");
    console.log("https://github.com/Mateus-Santos13");
    console.log("************************************");
}
function keyPress(): void{
    console.log("\nPressione ENTER para continuar...");
    Input.prompt();
}
main();