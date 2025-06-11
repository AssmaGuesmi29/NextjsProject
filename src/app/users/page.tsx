<<<<<<< HEAD
'use client';

import { useEffect, useState } from 'react';
import { UserModel } from '@/lib/db';

export default function UsersPage() {
    const [users, setUsers] = useState<UserModel[]>([]);
=======

'use client';

import { useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
>>>>>>> dfd2ff401316fcd2f78ed04de928cedfcf9f920b
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        try {
<<<<<<< HEAD
            const res = await fetch('/api/users',{
                method:'GET'
            });
            if (!res.ok) throw new Error('Erreur de réseau');

            const data = await res.json();
            const formattedUsers = data.map((user: UserModel) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt || user.created_at
            }));

            setUsers(formattedUsers);
        } catch (err) {
            setError('Erreur lors de la récupération des utilisateurs');
            console.error(err);
=======
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError('Erreur lors de la récupération des utilisateurs');
>>>>>>> dfd2ff401316fcd2f78ed04de928cedfcf9f920b
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
<<<<<<< HEAD
        if (!name || !email) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        setLoading(true);
        setError('');

=======
        setLoading(true);
>>>>>>> dfd2ff401316fcd2f78ed04de928cedfcf9f920b
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });
<<<<<<< HEAD

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Erreur lors de l\'ajout');
            }

            setName('');
            setEmail('');
            await fetchUsers();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue');
=======
            if (!res.ok) throw new Error('Erreur lors de l\'ajout');
            setName('');
            setEmail('');
            fetchUsers();
        } catch (err) {
            setError('Erreur lors de l\'ajout de l\'utilisateur');
>>>>>>> dfd2ff401316fcd2f78ed04de928cedfcf9f920b
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Confirmer la suppression de cet utilisateur ?')) return;
        setLoading(true);
<<<<<<< HEAD
        setError('');

=======
>>>>>>> dfd2ff401316fcd2f78ed04de928cedfcf9f920b
        try {
            const res = await fetch('/api/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
<<<<<<< HEAD

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Erreur lors de la suppression');
            }

            await fetchUsers();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue');
=======
            if (!res.ok) throw new Error('Erreur lors de la suppression');
            fetchUsers();
        } catch (err) {
            setError('Erreur lors de la suppression de l\'utilisateur');
>>>>>>> dfd2ff401316fcd2f78ed04de928cedfcf9f920b
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Gestion des utilisateurs</h1>

            <div className="mb-8 p-4 border rounded-lg bg-gray-50">
<<<<<<< HEAD
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <button
                    onClick={handleAddUser}
                    disabled={loading}
                    className={`px-6 py-2 text-white rounded transition-colors ${
                        loading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'En cours...' : 'Ajouter un utilisateur'}
                </button>

                {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
            </div>

            <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>

                {users.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Aucun utilisateur trouvé</p>
                ) : (
                    <ul className="space-y-3">
                        {users.map((user:UserModel) => (
                            <li
                                key={user.id}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border-b hover:bg-gray-50"
                            >
                                <div className="mb-2 md:mb-0">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-gray-600 text-sm">{user.email}</p>
                                    {user.createdAt && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            Créé le : {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    disabled={loading}
                                    className={`px-4 py-1.5 text-sm rounded ${
                                        loading ? 'bg-gray-400 cursor-wait' : 'bg-red-600 hover:bg-red-700 text-white'
                                    }`}
                                >
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
=======
                <input
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mr-2 p-2 border rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mr-2 p-2 border rounded"
                />
                <button
                    onClick={handleAddUser}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {loading ? 'Ajout en cours...' : 'Ajouter'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between p-2 hover:bg-gray-50"
                        >
                            <span>{user.name} ({user.email})</span>
                            <button
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={loading}
                                className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
>>>>>>> dfd2ff401316fcd2f78ed04de928cedfcf9f920b
            </div>
        </div>
    );
}
