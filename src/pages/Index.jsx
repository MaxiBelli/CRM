import { useLoaderData } from "react-router-dom";
import Customer from "../components/Customer";

export function loader() {
  const customers = [
    {
      id: 1,
      name: "John",
      phone: 102013313,
      email: "john@email.com",
      company: "Your Company",
    },
    {
      id: 2,
      name: "Karen",
      phone: 138198313,
      email: "karen@email.com",
      company: "Your Company",
    },
    {
      id: 3,
      name: "Josue",
      phone: 31983913,
      email: "josue@email.com",
      company: "Your Company",
    },
    {
      id: 4,
      name: "Michael",
      phone: 319381983,
      email: "miguel@email.com",
      company: "Your Company",
    },
    {
      id: 5,
      name: "Peter",
      phone: 1398198938,
      email: "pedro@email.com",
      company: "Your Company",
    },
  ];
  return customers;
}

function Index() {
  const customers = useLoaderData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Customers</h1>
      <p className="mt-3">Manage your Customers</p>

      {customers.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Customer</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <Customer customer={customer} key={customer.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No Customers yet</p>
      )}
    </>
  );
}

export default Index;
