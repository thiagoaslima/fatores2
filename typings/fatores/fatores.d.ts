declare module fatores {

	module entidades {
		interface ProtoEntity {
			Id: number;
			[others: string]: any;
			_delete?: boolean;
			_selected?: boolean;
		}

		interface User {
			UserId: string;
			UserName: string;
			Token: string;
			Expiracao: string;
			Password: string;
			Empresas: number[];
			Obras: number[];
			Tarefas: number[];
		}
	}

	module models {
		interface BasicModel {
			list: any[];
			queue(itens: Array<fatores.entidades.ProtoEntity>): BasicModel;
			unqueue(itens: Array<fatores.entidades.ProtoEntity>): BasicModel;
			fetch(): BasicModel | Error;
			get(items: any): Promise<fatores.entidades.ProtoEntity[]>;
		}

		interface UserModel {
			setUser(userObj: fatores.entidades.User, password: string): fatores.entidades.User;
			checkOnline(username: string, password: string): Promise<fatores.entidades.User>;
			checkCredentials(users: fatores.entidades.User[], username: string, password: string): Promise<fatores.entidades.User>;
		}
	}

	module utils {
		interface Storage {
			registerType(type: string, props: string[]): Map<string, string[]> | Object,
			compact(type: string, value: any[] | Object): any[],
			descompact(type: string, value: any[]): any[],
			save(type: string, values: any[]): void,
			get(type: string): any[]
		}
	}
}