import { useState , useEffect } from "react";
import AddUserModal from "./AddUserModal";
import adminService from "../../client/adminService";


export default function UserTable( {animate} ) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    is_superuser: true,
    is_active: true,
  });

  const [users , setUsers] = useState([])

  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    const res = await adminService.GetUsers();
    if (res.sucess) {
      setUsers(res.data);
    } else {
      console.error(res.message);
    }
  };

  const handleSave = () => {
    console.log("User saved", formData);
    adminService
      .UserCreate(
        formData.email,
        formData.is_active,
        formData.is_superuser,
        formData.username,
        formData.password,
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(err)
        console.error(error.response?.data);
      });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded shadow border" style={{
        opacity:    animate ? 1 : 0,
        transform:  animate ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.5s ease 0.58s, transform 0.5s ease 0.58s",
      }}>
      <div className="p-4 flex justify-between">
        <h2 className="text-lg font-semibold">User Management</h2>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add User
        </button>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3">Name & Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="p-3">
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </td>

              <td className="p-3">{user.is_superuser ? "Admin" : "User"}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    user.is_active === true
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddUserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        onChange={handleChange}
      />
    </div>
  );
}
