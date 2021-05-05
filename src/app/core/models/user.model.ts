import { environment } from "src/environments/environment";

export interface UserToken {
	active_status: boolean;
	// expiration: string;
	// is_internal: boolean;
	// refresh_token: string;
	// sex: string;
	token: string;
	// 	username: string;
	// 	identificationNumber: string;
}


export class UserLogin {
	public userName: string = null;
	public password: string = null;
	public token: string = null;
	public companyId = 12;
	public applicationId: number = environment.applicationId;
}
