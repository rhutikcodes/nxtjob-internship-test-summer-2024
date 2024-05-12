"use client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://backend.anees-azc.workers.dev/api/v1/users', { username });
      if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId);
        toast.success("Logged in successfully, userId set");
        setIsOpen(false); // Close modal on success
      } else {
        toast.error('Login failed: ' + response.data.message);
      }
    } catch (error) {
      toast.error('Login request failed');
      console.error('Login request failed:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal show={isOpen} size="md" onClose={() => setIsOpen(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-16 w-16 text-gray-400 " />
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              Join the community!
            </h3>
            <input
              type="text"
              className="w-full py-2 px-3 border rounded mb-4 text-gray-700 "
              placeholder="Enter username or use: Anonymous"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Join!'}
              </Button>
              <Button color="gray" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;




















// import axios from "axios";
// import { AnimatePresence, motion } from "framer-motion";
// import { Dispatch, SetStateAction, useState } from "react";
// import toast from "react-hot-toast";
// import { FiAlertCircle } from "react-icons/fi";

// const LoginModal = ({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
// }) => {
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!username.trim()) {
//       toast.error("Username cannot be empty.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('https://backend.anees-azc.workers.dev/api/v1/users', { username });
//       if (response.data.userId) {
//         // Set cookie in the browser
//         localStorage.setItem('userId', response.data.userId);
//         console.log('Logged in successfully, userId set');
//       } else {
//         console.error('Login failed:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Login request failed:', error);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setIsOpen(false)}
//           className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
//         >
//           <motion.div
//             initial={{ scale: 0, rotate: "12.5deg" }}
//             animate={{ scale: 1, rotate: "0deg" }}
//             exit={{ scale: 0, rotate: "0deg" }}
//             onClick={(e: any) => e.stopPropagation()}
//             className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
//           >
//             <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
//             <div className="relative z-10">
//               <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
//                 <FiAlertCircle />
//               </div>
//               <h3 className="text-3xl font-bold text-center mb-2">
//                 Join the community!
//               </h3>
//               <p className="text-center mb-6">
//                 Be part of an amazing community and share your thoughts and ideas with the world.
//               </p>
//               <input
//                 type="text"

//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your username or use username: Anonymous"
//                 className="w-full py-2 px-3 border rounded mb-4 text-indigo-600"
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
//                 >
//                   Go back
//                 </button>

//                 <button
//                   onClick={() => {
//                     handleLogin();

//                     setIsOpen(false)
//                   }}
//                   className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
//                 >
//                   Join!
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LoginModal;