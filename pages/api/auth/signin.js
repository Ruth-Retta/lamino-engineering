import { signIn } from 'next-auth/client';

export default function SignIn() {
  return (
    <div>
      <form onSubmit={signIn}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
