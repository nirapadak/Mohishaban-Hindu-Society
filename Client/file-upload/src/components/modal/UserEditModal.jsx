import '../../assets/css/editModal.css'


const UserEditModal = ({ Yes, Not }) => {
  

 
  return (
    <>
      <div className="modal-container">
        <div className="one-modal">
          <h1>আপনি এই ব্যবহারকারী সম্পাদনা করতে চান?</h1>
          <p>দুঃখিত আপনি এটি সম্পাদনা করবেন না </p>
        
          <button className="edit-modal-button" onClick={Yes}>
            Yes
          </button>
          <button className="edit-modal-button" onClick={Not}>
            Not
          </button>
        </div>
      </div>
    </>
  );
};

export default UserEditModal;
