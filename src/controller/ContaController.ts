import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";
import { Conta } from "../model/conta";
import { formatarMoeda } from "../util/Currency";



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
    
    procurarPorTitular(titular: string): void {
        //Filtragem dos dados;
        const buscaPorTitular = this.listaContas.filter(conta => conta.titular.toUpperCase().includes(titular.toUpperCase()));//busca a conta no array
        //Filtragem dos dados filtrados;
        if(buscaPorTitular.length > 0){
            buscaPorTitular.forEach(conta => conta.visualizar());
        }else{
            console.log(colors.fg.red,`\nNao foram encontradas contas com o titular ${titular}.`,colors.reset);
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
        const buscaConta = this.buscarNoArray(numero);//busca a conta no array

        if(buscaConta !== null){
            if(buscaConta.sacar(valor) === true)
                console.log(colors.fg.green,`\nO saque no valor de ${formatarMoeda(valor)} na conta número ${numero} foi realizado com sucesso.`,colors.reset);

        }else{
            console.log(colors.fg.red,`\nA conta número ${numero} nao foi encontrada.`,colors.reset);
        }
    }

    depositar(numero: number, valor: number): void {
        const buscaConta = this.buscarNoArray(numero);//busca a conta no array

        if(buscaConta !== null){
            buscaConta.depositar(valor);
            console.log(colors.fg.green,`\nO deposito no valor de ${formatarMoeda(valor)} na conta número ${numero} foi realizado com sucesso.`,colors.reset);
        }else{
            console.log(colors.fg.red,`\nA conta número ${numero} nao foi encontrada.`,colors.reset); 
        }
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        const buscaContaOrigem = this.buscarNoArray(numeroOrigem);//busca a conta no array
        const buscaContaDestino = this.buscarNoArray(numeroDestino);//busca a conta no array
        if(buscaContaOrigem !== null && buscaContaDestino !== null) {
            if(buscaContaOrigem.sacar(valor) === true){ {
            buscaContaDestino.depositar(valor);
            console.log(colors.fg.green,`\nA transferencia no valor de ${formatarMoeda(valor)} da conta número ${numeroOrigem} para a conta número ${numeroDestino} foi realizado com sucesso.`,colors.reset);
            }
        }else{
            console.log(colors.fg.red,`\nA conta de origem e/ou de destino nao foi encontrada.`,colors.reset); 
        }
    }
        
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