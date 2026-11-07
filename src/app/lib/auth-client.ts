import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins:[
        jwtClient()
    ]
})

/**
 * Single client instance for the whole app.
 *
 * `createAuthClient()` builds its own session atom and its own
 * `$sessionSignal` listeners, so a second instance would never learn about
 * sign-ins/sign-outs performed through the first one (e.g. the Navbar would
 * keep showing "Login" after a successful login on /login). Everything must
 * therefore be destructured from this one `authClient`.
 */
export const { signIn, signUp, useSession, signOut } = authClient;