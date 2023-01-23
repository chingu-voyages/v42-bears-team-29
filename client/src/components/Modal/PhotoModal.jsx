import "./modal.css";
import { MdPermMedia } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef } from "react";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

const PhotoModal = ({ setEditPhoto }) => {
  const clickRef = useRef(null);
  console.log(server);
  useEffect(() => {
    function handleClickOutside(e) {
      if (!clickRef.current.contains(e.target)) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  const closeModal = () => {
    setEditPhoto(false);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const { photo } = e.target.elements;
    const photoElement = new FormData();
    photoElement.append("profilePic", photo.files[0]);
    // TODO: set up storage for image on BE
    // const res = axios.put(`${server}/user/info`, {
    //   id: "11684414-9afc-4f10-be32-28bb1652b88e",
    //   profilePic: pic,
    // });
    // if (res) {
    //   closeModal();
    // }
  };
  return (
    <div className="modal-container primary">
      <form
        ref={clickRef}
        className="modalCard gap-6 items-center"
        onSubmit={handleSubmit}
      >
        <RxCross2
          size={20}
          className="absolute top-2 right-3 cursor-pointer hover:text-baby"
          onClick={closeModal}
        />
        <label
          htmlFor="photo"
          className="flex items-center justify-center gap-2"
        >
          Upload your new profile pic here
          <MdPermMedia
            size={25}
            className="cursor-pointer text-grotto-100 hover:text-baby"
          />
          <input
            type="file"
            id="photo"
            name="photo"
            accept=".png,.jpg,.jpeg,.gif"
            className="hidden"
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default PhotoModal;