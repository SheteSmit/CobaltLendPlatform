import { Modal, Button } from "react-bootstrap"

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div>
          <Modal.Title className="mb-2" id="contained-modal-title-vcenter">
            Select a token
          </Modal.Title>
          <input
            className="form-input modalinput"
            type="text"
            placeholder="Search name or paste address"
          ></input>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="modalbtngroup">
          <div className="divbtngroup pt-2 pb-2">
            <button className="btngroup ml-4">
              <span>ETH</span>
              <span>0</span>
            </button>
          </div>
          <div className="divbtngroup pt-2 pb-2">
            <button className="btngroup ml-4 mt-4">
              <span>CHC</span>
              <span>0</span>
            </button>
          </div>
          <div className="divbtngroup pt-2 pb-2">
            <button className="btngroup ml-4 mt-4">
              <span>Wood</span>
              <span>0</span>
            </button>
          </div>
          <div className="divbtngroup pt-2 pb-2">
            <button className="btngroup ml-4 mt-4">
              <span>Slick</span>
              <span>0</span>
            </button>
          </div>
          <div className="divbtngroup pt-2 pb-2">
            <button className="btngroup ml-4 mt-4">
              <span>HAM</span>
              <span>0</span>
            </button>
          </div>
          <div className="divbtngroup pt-2 pb-2">
            <button className="btngroup ml-4 mt-4">
              <span>ETH</span>
              <span>0</span>
            </button>
          </div>
          <div className="divbtngroup pt-2 pb-2">
            <button className="btngroup ml-4 mt-4">
              <span>Smit</span>
              <span>0</span>
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="m-auto">Manage</Button>
      </Modal.Footer>
    </Modal>
  )
}
