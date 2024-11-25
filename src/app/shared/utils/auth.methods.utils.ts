import { HttpHeaders } from "@angular/common/http";
import { LOCAL_STORAGE_TOKEN_AUTH_NAME } from "../constants/auth/auth.constants";

export class AuthMethodsUtils {
    
    public static getToken(): string | null {
        return localStorage.getItem(LOCAL_STORAGE_TOKEN_AUTH_NAME);
    }
    public static createAuthHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
    }
}
