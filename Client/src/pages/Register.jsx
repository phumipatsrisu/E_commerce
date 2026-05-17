const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <div>
          <label>
            <input type="text" placeholder="username..." />
          </label>
        </div>

        <div>
          <label>
            <input type="password" placeholder="password..." />
          </label>
        </div>

        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
