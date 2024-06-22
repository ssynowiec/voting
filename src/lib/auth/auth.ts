import {
	type DatabaseSession,
	type DatabaseUser,
	Lucia,
	type UserId,
} from 'lucia';
import { adapter } from '@/utils/luciaAdapter';
import { cache } from 'react';
import { cookies } from 'next/headers';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: (attributes) => {
		return {
			githubId: attributes.github_id,
			username: attributes.username,
		};
	},
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			github_id: number;
			username: string;
		};
	}
}

export interface Adapter {
	deleteExpiredSessions(): Promise<void>;

	deleteSession(sessionId: string): Promise<void>;

	deleteUserSessions(userId: UserId): Promise<void>;

	getSessionAndUser(
		sessionId: string,
	): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]>;

	getUserSessions(userId: UserId): Promise<DatabaseSession[]>;

	setSession(session: DatabaseSession): Promise<void>;

	updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void>;
}

export const getUser = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) return null;
	const { user, session } = await lucia.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}
	return user;
});
