export default function AddUserModal({ show, onClose , onSave , onChange}) {
  if (!show) return null; // don't render if false

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Add User</h2>

        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            // trigger parent function
            onSave();
          }}
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={onChange}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={onChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={onChange}
          />

          {/* Active Toggle */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm">IsSuperUser</span>
            <input
              type="checkbox"
              name="is_superuser"
              defaultChecked
              onChange={onChange}
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm">Active</span>
            <input
              type="checkbox"
              name="is_active"
              defaultChecked
              onChange={onChange}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg transition duration-200 hover:bg-gray-100 hover:shadow-md hover:scale-105"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-700 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
