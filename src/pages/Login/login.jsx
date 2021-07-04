import React from "react"
import "./login.css"

const Login = () => {
  return (
    <section className="form-body">
      <main class="form-signin">
        <form>
          <img
            class="mb-4"
            src="https://i.imgur.com/rRTK4EH.png"
            alt="signin"
            width="300"
            height="300"
          />
          <h1 class="mt-5 ml-auto mb-3 ">Please Sign In</h1>

          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
          </div>

          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </section>
  )
}

export default Login
