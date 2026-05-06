import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Work");

  const navigate = useNavigate();

  // FETCH TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD TASK
  const addTask = async () => {
    if (!title) {
      alert("Please enter task");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          dueDate,
          category,
        }
      );

      setTasks([...tasks, res.data]);

      setTitle("");
      setDueDate("");
      setCategory("Work");
    } catch (err) {
      console.log(err);
      alert("Task creation failed");
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-6xl font-bold">My Tasks</h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl text-xl font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="space-y-5 mb-10">

          <input
            type="text"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black border border-gray-700 text-xl outline-none"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black border border-gray-700 text-xl outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black border border-gray-700 text-xl outline-none"
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>

          <button
            onClick={addTask}
            className="w-full bg-blue-700 hover:bg-blue-800 py-5 rounded-2xl text-2xl font-bold"
          >
            Add Task
          </button>
        </div>

        <div className="space-y-5">
          {tasks.length === 0 ? (
            <p className="text-center text-3xl text-gray-400">
              No tasks yet. Add your first task 🚀
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="border border-gray-700 rounded-2xl p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl font-semibold">
                    {task.title}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Due: {task.dueDate || "No date"}
                  </p>

                  <p className="text-blue-400 mt-1">
                    {task.category}
                  </p>
                </div>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={28} />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;