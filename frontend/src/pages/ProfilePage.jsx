import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ name, email });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="p-2 md:p-6">
      <h4 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
        Profile Settings
      </h4>
      
      <div className="bg-white rounded-lg border border-gray-100 p-4 md:p-6 mb-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full overflow-hidden mx-auto sm:mx-0 sm:mr-6">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h6 className="text-xl font-semibold text-gray-900">{user.name}</h6>
            <p className="text-gray-600 break-all">
              {user.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="mt-4">
            <button 
              type="submit" 
              className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
              onClick={() => toast.error("Feature not available yet") }
            >
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : "Update Profile"}
            </button>
          </div>
        </form>
      </div>

      <hr className="my-6 border-gray-200" />

      <div className="bg-white rounded-lg border border-gray-100 p-4 md:p-6 hover:shadow-md transition-shadow">
        <h6 className="text-xl font-semibold mb-4 text-gray-900">
          Account Actions
        </h6>
        <button 
          onClick={logout}
          className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;