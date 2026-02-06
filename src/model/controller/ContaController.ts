import { ContaRepository } from "../../repository/ContaRepository";
import { colors } from "../../util/Colors";
import { Conta } from "../Conta";



export class ContaController implements ContaRepository{
    
    private listaContas = new Array<Conta>();

    public numero: number = 0;

    //Métodos do CRUD
    
    procurarPorNumero(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);//busca a conta no array

        if(buscaConta !== null){
            buscaConta.visualizar();
        }else{
            console.log(colors.fg.red,`\nA conta número ${numero} nao foi encontrada.`,colors.reset);
        }
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {//vai percorrer o array e imprimir as contas
            conta.visualizar();
        }
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);//adiciona a conta ao array
        console.log(colors.fg.green,`\nA conta número ${conta.numero} foi cadastrada com sucesso.`,colors.reset);
    }

    atualizar(conta: Conta): void {
    const buscaConta = this.buscarNoArray(conta.numero);//busca a conta no array

        if(buscaConta !== null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;//busca a conta no array e atualiza com os dados que foram passados;
            console.log(colors.fg.green,`\nA conta número ${conta.numero} foi atualizada com sucesso.`,colors.reset);
        }else{
            console.log(colors.fg.red,`\nA conta número ${conta.numero} nao foi encontrada.`,colors.reset);
        }
    }

    deletar(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);//busca a conta no array

        if(buscaConta !== null){
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);//remove a conta do array
            console.log(colors.fg.green,`\nA conta número ${numero} foi deletada com sucesso.`,colors.reset);
        }else{
            console.log(colors.fg.red,`\nA conta número ${numero} nao foi encontrada.`,colors.reset);
        }
    }

    //Métodos Bancários
    sacar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    

    //Métodos Auxiliares

    public gerarNumero(): number{
        return ++ this.numero;
    }

    public buscarNoArray(numero: number): Conta|null{
        for(let conta of this.listaContas){
            if(conta.numero === numero){
                return conta;
            }
        }
        return null;
    }
}