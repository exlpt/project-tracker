export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={(event) => event.preventDefault()}>
        <label for="login--username">
					Username
          <input type="text" placeholder="john_doe" id="login--username" />
        </label>

        <label for="login--password">
					Password
          <input type="text" placeholder="••••••••••" id="login--password" />
        </label>

        <button>Login</button>
      </form>
    </div>
  );
}
