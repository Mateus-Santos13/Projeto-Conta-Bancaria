import leia from "readline-sync";
import { colors } from './src/util/Colors';


export function main(){

    let opcao: number;

    while(true){
        //Aqui entra os console log do menu com as configurações de cor
        console.log(colors.bg.black, colors.fg.magenta);
        console.log("************************************************************");
        console.log("\n");
        console.log("                   Banco Santos Brasil                      ");
        console.log("\n");
        console.log("************************************************************");
        console.log("\n");
        console.log("1 - Criar Conta");
        console.log("2 - Listar todas as contas");
        console.log("3 - Buscar conta por número");
        console.log("4 - Atualizar dados da conta");
        console.log("5 - Apagar conta");
        console.log("6 - Sacar");
        console.log("7 - Depositar");
        console.log("8 - Transferir valor entre contas");
        console.log("9 - Sair");
        console.log("\n");
        console.log("************************************************************");
        console.log("\n");
        console.log(colors.reset);
        console.log(colors.fg.red,colors.bg.black);
        console.log("Escolha uma opção: ");
        opcao = leia.questionInt();
        
        if(opcao == 9){
            console.log("\nBanco Santos Brasil, o seu banco de confiança!");
            sobre();
            process.exit(0);
        }

    switch(opcao){ //Opções do menu
        case 1:
            console.log("\nCriar Conta");
            break;
        case 2: 
            console.log("\nListar todas as contas");
            break;
        case 3:
            console.log("\nBuscar conta por número");
            break;
        case 4:
            console.log("\nAtualizar dados da conta");
            break;
        case 5:
            console.log("\nApagar conta");
            break;
        case 6:
            console.log("\nSacar");
            break;
        case 7:
            console.log("\nDepositar");
            break;
        case 8:
            console.log("\nTransferir valor entre contas");
            break;
        default:
            console.log("Opção inválida!");
            break;
        }
    }
    

}

export function sobre(): void{
    console.log("\n************************************");
    console.log("Projeto desenvolvido por: ");
    console.log("Mateus Santos");
    console.log("mateus.santos.eng.elt@gmail.com");
    console.log("https://github.com/Mateus-Santos13");
    console.log("************************************");
}

main();