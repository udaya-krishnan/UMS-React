import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage ,profileEdit} from "../../redux/userRedux/userthunk";
import { ToastContainer,toast } from "react-toastify";

function Profile() {
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [mobile,setMobile]=useState('')
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);

  useEffect(() => {
    if (image) {
      console.log("render");
      dispatch(addImage({ image, userId: user._id }));
    }
  }, [image]);

  useEffect(() => {
    if (user) {
      setData(user);
      setFormData(user);
    }
  }, [user]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
        ...formData,
        [name]: value,
    });
};

function submit(){
  // const mobile=
  console.log(typeof(mobile));
  let mob= Number(mobile)
  const mobileRegex = /^\+?[1-9]\d{1,14}$/; 
  if(formData.name.trim()===''||formData.mobile.trim()===''){
    toast.error('All Fields Are Required', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
  }else if(!mobileRegex.test(mob)){
    console.log('moble');
    toast.error('Invalid Mobile', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
  }else{
    dispatch(profileEdit({formData,userId:user._id}))
  setEdit(false)
  }
  
}


  return (
    <div className="bg-white flex-grow flex justify-center items-center">
      <ToastContainer/>
      <div className="bg-black w-96 h-auto flex flex-col items-center p-6 rounded-lg shadow-lg relative">
        <div className="relative w-40 h-40 -mt-16">
          
          <img
            src={`/public/userImage/${data.image}`}
            alt="Profile"
            className="rounded-full w-40 h-40 object-cover"
          />
          <div className="absloute h-16  w-full">
            <button
              className="absolute bottom-0 right-0 bg-transparent border-none p-1"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-8 h-8"
              >
                <path
                  fill="#fff"
                  d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                />
              </svg>
            </button>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>

        {edit === false ? (
          <div className="bg-white w-full p-4 rounded-lg mt-16 relative">
            <button className="absolute top-2 right-2 bg-transparent border-none" onClick={()=>setEdit(!edit)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5"
              >
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-center mb-2">
              {data.name}
            </h2>
            <p className="text-center text-gray-700 mb-1">
              Mobile: {data.mobile}
            </p>
            <p className="text-center text-gray-700">Email: {data.email}</p>
          </div>
        ) : (
          <div>
            <div className="mb-2">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Mobile:</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={(e)=>{
                  handleChange(e)
                  setMobile(e.target.value)
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={()=>submit()}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
