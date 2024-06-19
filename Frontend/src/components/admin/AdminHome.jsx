import React, { useEffect, useState } from "react";
import { Block, Clear, Edit, Save } from "../../../public/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser, fetchData } from "../../redux/adminRedux/adminthunk";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';

function searchFun(userData, searchValue) {
  const data = userData.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return data;
}

function AdminHome() {
  const userData = useSelector((store) => store.admin.userData);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = searchFun(userData, search);
    setData(data);
  }, [search]);

  useEffect(() => {
    if (userData.length > 0) {
      setData(userData);
    }
  }, [userData]);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  function handleSave(userId) {
    if (name.trim() === "") {
      toast.error(
        "Enter a valid name. The name must contain at least 3 characters",
        {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        }
      );
    } else {
      dispatch(editUser({ name, userId, toast }));

      setEdit(null);
    }
  }

  function del(userId){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
      
        showCancelButton: true,
        confirmButtonColor: '#000',
        cancelButtonColor: '#000',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Deleted!',
            confirmButtonColor:'#000'
          }).then((result)=>{
            dispatch(deleteUser({userId,toast}))
          })
        }
      })

    


  }

  return (
    <div className="bg-white flex-grow flex flex-col min-h-screen p-4">
      <ToastContainer />
      <div className="flex justify-center mb-4">
        <div className="flex items-center w-full max-w-4xl mx-auto space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            className="border rounded px-4 py-2 flex-grow"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 py-2 border rounded" onClick={()=>setSearch('')}>
            <Clear />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full max-w-4xl mx-auto">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((user, index) => (
                <tr className="bg-white text-black" key={index}>
                  {edit == user._id ? (
                    <>
                      <td className="border-y px-4 py-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        
                          className="border-b-black border-b-2 focus:outline-none"
                        />
                      </td>
                      <td className="border-y px-4 py-2">{user.email}</td>
                      <td className="border-y px-4 py-2">{user.mobile}</td>
                      <td className="border-y px-4 py-2">
                        {user.is_blocked ? "Blocked" : "UnBlocked"}
                      </td>
                      <td className="border-y px-4 py-2">
                        <button onClick={() => handleSave(user._id)}>
                          <Save />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-y px-4 py-2">{user.name}</td>
                      <td className="border-y px-4 py-2">{user.email}</td>
                      <td className="border-y px-4 py-2">{user.mobile}</td>
                      <td className="border-y px-4 py-2">
                        {user.is_blocked ? "Blocked" : "UnBlocked"}
                      </td>
                      <td className="border-y px-4 py-2">
                        <button
                          onClick={() => {
                            setEdit(user._id);
                            setName(user.name);
                          }}
                        >
                          <Edit />
                        </button>
                      </td>
                      <td className="border-y px-4 py-2">
                        <button onClick={()=>del(user._id)}>
                          <Block />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
