import { colors } from "../util/Colors";
import { Conta } from "./conta";


export class ContaPoupanca extends Conta{

    //Atributos específicos de conta Poupança;
    private _diaAniversario: number;


    constructor(numero: number, agencia: number, titular: string, tipo: number, saldo: number, diaAniversario: number){//Construtor;
        
        super(numero, agencia, titular, tipo, saldo);//Chama o construtor da classe mae;

        this._diaAniversario = diaAniversario;//Atributo da classe filha
    }


	public get diaAniversario(): number {
		return this._diaAniversario;
	}

	public set diaAniversario(value: number) {
		this._diaAniversario = value;
	}
    public visualizar(): void {//Método visualizar da classe ContaPoupança;

        super.visualizar();//Chama o método da classe mae;
        console.log(`Aniversário da conta: ${this._diaAniversario}`);//Imprime o atributo da classe filha;
    }
}
//Agora, fazer o atributo conta poupança. o unico atributo a mais é o atributo aniversário;
