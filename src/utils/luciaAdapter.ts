import type { Adapter } from '@/lib/auth/auth';
import { env } from '@/env';

const API_URL = env.NEXT_PUBLIC_API_URL;

export const adapter: Adapter = {
	deleteExpiredSessions: async () => {
		console.log('test 1');
		try {
			const response = await fetch(`${API_URL}/sessions/expired`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete expired sessions');
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	},
	deleteSession: async (sessionId: string) => {
		console.log('test 2');
		try {
			const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error(`Failed to delete session with id: ${sessionId}`);
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	},
	deleteUserSessions: async (userId: string) => {
		console.log('test 3');
		try {
			const response = await fetch(`${API_URL}/users/${userId}/sessions`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error(
					`Failed to delete sessions for user with id: ${userId}`,
				);
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	},
	getSessionAndUser: async (sessionId: string) => {
		console.log('test 4');
		const response = await fetch(`${API_URL}/sessions/${sessionId}`);

		if (!response.ok) {
			return [{ session: null }, { user: null }];
		}

		const data = await response.json();
		const { session, user } = data;

		// console.log(...data);
		// return data;

		return [{ ...session, expiresAt: new Date(session.expiresAt) }, user];
	},
	getUserSessions: async (userId: string) => {
		console.log('test 5');
		try {
			const response = await fetch(`${API_URL}/admins/${userId}/sessions`);

			if (!response.ok) {
				throw new Error(`Failed to get sessions for user with id: ${userId}`);
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	},
	setSession: async (session) => {
		console.log('test 6');
		try {
			const response = await fetch(`${API_URL}/sessions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(session),
			});

			if (!response.ok) {
				throw new Error('Failed to set session');
			}

			const data = await response.json();

			return await data;
		} catch (error) {
			console.error(error);
		}
	},
	updateSessionExpiration: async (sessionId, expiresAt) => {
		console.log('test 7');
		try {
			const response = await fetch(
				`${API_URL}/sessions/${sessionId}/expiration`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ expiresAt }),
				},
			);

			if (!response.ok) {
				throw new Error(
					`Failed to update session expiration for session id: ${sessionId}`,
				);
			}

			return await response.json();
		} catch (error) {
			console.error(error);
		}
	},
};
