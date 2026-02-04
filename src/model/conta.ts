export class Conta{


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
    
    
}