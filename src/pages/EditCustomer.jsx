import {
  Form as RouterForm,
  useNavigate,
  useLoaderData,
} from "react-router-dom";
import { getCustomer } from "../data/customers";
import Form from "../components/Formulario";

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

function EditCustomer() {
  const navigate = useNavigate();
  const customer = useLoaderData();

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
