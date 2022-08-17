import './App.css';
import {Formik} from "formik";
import * as Yup from "yup"

const refresh = () => {
    setTimeout(() => window.location.reload(), 1000)
}

function App() {
  const validationsSchema = Yup.object().shape({
      firstName: Yup.string().typeError("Must be string").max(20, "Must be less than 20 symbols").required("First Name is required"),
      lastName: Yup.string().typeError("Must be string").max(30, "Must be less than 20 symbols").required("Last Name is required"),
      password: Yup.string().min(8, "Must be more than 8 symbols").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password is incorrect"),
      email: Yup.string().email("Please, type correct email!").required("Email is required")
  })

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: "",
      }}
      validateOnBlur
      onSubmit={(values) => {
          console.log(values) }}
      validationSchema={validationsSchema}
    >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
            <div className="form">
                <p>
                    <label htmlFor="firstName">First Name</label><br/>
                    <input
                        className="input"
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                    />
                </p>
                { touched.firstName && errors.firstName && <p className="error">{errors.firstName}</p> }
                <p>
                    <label htmlFor="lastName">Last Name</label><br/>
                    <input
                        className="input"
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                    />
                </p>
                { touched.lastName && errors.lastName && <p className="error">{errors.lastName}</p> }
                <p>
                    <label htmlFor="password">Password</label><br/>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                </p>
                { touched.password && errors.password && <p className="error">{errors.password}</p> }
                <p>
                    <label htmlFor="confirmPassword">Confirm Password</label><br/>
                    <input
                        className="input"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                    />
                </p>
                { touched.confirmPassword && errors.confirmPassword && <p className="error">{errors.confirmPassword}</p> }
                <p>
                    <label htmlFor="email">Email</label><br/>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                </p>
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                <button
                    disabled={!isValid && !dirty}
                    onClick={() => {handleSubmit(); refresh()}}
                    type="submit"
                >Submit</button>
            </div>
        )}
    </Formik>
  );
}

export default App;
