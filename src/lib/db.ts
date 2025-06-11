export interface UserModel {
    id: string;
    name: string;
    email: string;
    createdAt?: string;
    created_at?: string; // Pour la compatibilité PostgreSQL
}
