import '../../assets/css/editModal.css'


const UserEditModal = ({Yes, Not}) => {
 
  return (
    <>
      <div className="modal-container">
        <div className="one-modal">
          <h1>You want Edit this user</h1>
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
