import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import type { Db } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

/**
 * Create the Mongo connection lazily, on first use.
 *
 * `next build` (locally and on Vercel) evaluates this module while collecting
 * page data for /api/auth/[...all] — at that point MONGODB_URL may not be
 * available, so nothing Mongo-related may run at module load. The driver only
 * opens a connection on the first query anyway, so this also avoids keeping a
 * connection open across serverless invocations.
 */
let mongo: { client: MongoClient; db: Db } | undefined;

function getMongo() {
    if (!mongo) {
        const uri = process.env.MONGODB_URL;
        if (!uri) {
            throw new Error(
                "MONGODB_URL is not set. Add it to the environment (Vercel: Project Settings → Environment Variables)."
            );
        }
        const client = new MongoClient(uri);
        mongo = { client, db: client.db("ImpactConnect") };
    }
    return mongo;
}

/**
 * Proxy that forwards to the real object the first time a property is read,
 * so `mongodbAdapter` / `betterAuth` can be configured at module scope while
 * the actual connection stays deferred until a request needs it.
 */
function lazy<T extends object>(resolve: () => T): T {
    return new Proxy({} as T, {
        get(_target, property) {
            const receiver = resolve();
            const value = Reflect.get(receiver, property);
            return typeof value === "function" ? value.bind(receiver) : value;
        },
        has(_target, property) {
            return Reflect.has(resolve(), property);
        },
    });
}

const client = lazy<MongoClient>(() => getMongo().client);
const db = lazy<Db>(() => getMongo().db);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),

    plugins: [jwt()],
    session: {
        cookieCache:{
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }
    }
});