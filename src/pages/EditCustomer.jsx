import {
  Form as RouterForm,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import { getCustomer, updateCustomer } from "../data/customers";
import Form from "../components/Form";
import Error from "../components/Error";

export async function loader({ params }) {
  const customer = await getCustomer(params.customerId);
  if (Object.values(customer).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "The customer was not found",
    });
  }
  return customer;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");

  // Validation
  const errors = [];
  if (Object.values(data).includes("")) {
    errors.push("All fields are required");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errors.push("The email is not valid");
  }

  // Return data if there are errors
  if (Object.keys(errors).length) {
    return errors;
  }

  // Update the customer
  await updateCustomer(params.customerId, data);
  return redirect("/");
}

function EditCustomer() {
  const navigate = useNavigate();
  const customer = useLoaderData();
  const errors = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Edit Customer</h1>
      <p className="mt-3">You can modify the data of a customer below</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errors?.length &&
          errors.map((error, i) => <Error key={i}>{error}</Error>)}

        <RouterForm method="post" noValidate>
          <Form customer={customer} />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Save Changes"
          />
        </RouterForm>
      </div>
    </>
  );
}

export default EditCustomer;
