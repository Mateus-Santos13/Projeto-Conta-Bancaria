import { colors } from "../util/Colors";
import { Conta } from "./Conta";


export class ContaCorrente extends Conta{

    //Atributos específicos de conta Corrente;
    private _limite: number;


    constructor(numero: number, agencia: number, titular: string, tipo: number, saldo: number, limite: number){//Construtor;
        
        super(numero, agencia, titular, tipo, saldo);//Chama o construtor da classe mae;

        this._limite = limite;//Atributo da classe filha
    }
    //Métodos get e set específicos da Classe ContaCorrente;
	public get limite(): number {
		return this._limite;
	}

	public set limite(value: number) {
		this._limite = value;
	}

    public visualizar(): void {
        
        super.visualizar();//Chama o método da classe mae;
        console.log(`Limite da conta: ${this._limite.toFixed(2)}`);//Imprime o atributo da classe filha;
    }


    public sacar(valor: number): boolean {
        
        if (valor <= 0) {
            console.log(colors.fg.red, "O valor deve ser positivo!", colors.reset);
            return false;
        }
        
        if (valor > (this.saldo + this._limite)) {
            console.log(colors.fg.red, "Saldo insuficiente!", colors.reset);
            return false;
        } else {
            this.saldo -= valor;
            return true;
        }
    }
}