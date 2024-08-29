export interface AuthResponse {
    token: string;
    user: {
        user_id: number;
        email: string;
        name: string;
    }
}