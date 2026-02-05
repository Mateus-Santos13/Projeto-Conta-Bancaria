import { colors } from '../util/Colors';//importando o arquivo colors.ts

//Geralmente, a super classe é abstrata, pois ela não pode ser instanciada;

export abstract class Conta{


    //Atributos da classe;
    //Por boas práticas, o atributo privado deve ser iniciado com underline;
    private _numero: number;
    private _agencia: number;
    private _titular: string;
    private _tipo: number;
    private _saldo: number;

    //Método Constructor
	constructor(numero: number, agencia: number, titular: string, tipo: number, saldo: number) {
		this._numero = numero;
		this._agencia = agencia;
		this._titular = titular;
		this._tipo = tipo;
		this._saldo = saldo;
	}

    //Método get e set de todos os atributos da classe;
	public get numero(): number {
		return this._numero;
	}

 
	public get agencia(): number {
		return this._agencia;
	}


	public get titular(): string {
		return this._titular;
	}

 
	public get tipo(): number {
		return this._tipo;
	}


	public get saldo(): number {
		return this._saldo;
	}

	public set numero(value: number) {
		this._numero = value;
	}


	public set agencia(value: number) {
		this._agencia = value;
	}


	public set titular(value: string) {
		this._titular = value;
	}


	public set tipo(value: number) {
		this._tipo = value;
	}


	public set saldo(value: number) {
		this._saldo = value;
	}
    
    

    //Métodos Auxiliades


    
    //Método Sacar
    public sacar(valor: number): boolean{
       
        if(valor <=0){
            console.log(colors.fg.red, "O valor deve ser positivo!", colors.reset);
            return false;
        }
       
        if(valor > this._saldo){
        console.log(colors.fg.red, "Saldo insuficiente!", colors.reset);
        return false;
       }else{
           this._saldo -= valor;
           return true;
       }
        
    }


     public depositar(valor: number): void{
       if(valor > 0){
            this._saldo += valor;
        }else{
            console.log(colors.fg.red, "O valor deve ser positivo!", colors.reset);
       }
    }


    //Mostrar todos os dados do objetos de uma vez só

    public visualizar(): void{

        let tipo: string;

        switch(this._tipo){
            case 1:
                tipo = "Conta Corrente";
                break;
            case 2:
                tipo = "Conta Poupanca";
                break;
            default:
                tipo = "Tipo inválido";
                break;
        }

        console.log("\n*********************************");
        console.log("         Dados da Conta          ");
        console.log("*********************************");
        console.log(`Número da conta: ${this._numero}`);
        console.log(`Agência: ${this._agencia}`);
        console.log(`Titular: ${this._titular}`);
        console.log(`Tipo: ${tipo}`);
        console.log(`Saldo: ${this._saldo.toFixed(2)}`);
    }
}