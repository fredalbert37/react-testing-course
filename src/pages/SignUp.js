import React, { useState } from "react";
import InputComponent from "../components/InputComponent";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = (e) =>{
      e.preventDefault(); 
      console.log(email, password);
  }

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto">
          <div className="card">
            <div className="card-body">
              <h4>Crear cuenta</h4>
              <hr />
              <form onSubmit={createAccount}>
                <InputComponent
                  id="email"
                  labelText="Correo electronico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputComponent
                  id="password"
                  labelText="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mb-3">
                  <button
                    id="btn-register"
                    className="btn btn-primary"
                    type="submit"
                  >
                    Crear Cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
