import '../../assets/css/editModal.css'


const UserEditModal = ({massage, data, Yes, Not }) => {
  

 
  return (
    <>
      <div className="modal-container">
        <div className="one-modal">
          <h1>{massage}</h1>
          <p>{ data}</p>
        
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
