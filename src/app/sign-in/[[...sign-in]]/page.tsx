import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className="flex-1 flex items-center justify-center p-8 sm:p-20">
      <section aria-labelledby="sign-in-title">
        <h1 id="sign-in-title" className="sr-only">Sign In</h1>
        <article>
          <SignIn />
        </article>
      </section>
    </main>
  );
}