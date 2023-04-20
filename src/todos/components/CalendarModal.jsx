import { addHours } from "date-fns";
import { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-25%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState( true );

    const [formValues, setFormValues] = useState({
        title: 'Omar',
        notes: 'Ascanio',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name] : target.value,
        })
    };

    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    };

    const onCloseModal = () => {
        console.log('cerrando modal');
        setIsOpen( false );
    };

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1> New Event </h1>
            <hr />
            <form className="container">

                <div className="form-group mb-2">
                    <label>Start date and time</label>
                    <DatePicker 
                        selected={ formValues.start }
                        onChange={( event ) => { onDateChanged( event, 'start' ) }}
                        className="form-control"
                        dateFormat="Pp"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>End date and time</label>
                    <DatePicker
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        onChange={( event ) => { onDateChanged( event, 'end' ) }}
                        className="form-control"
                        dateFormat="Pp"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title and Notes</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Short Description</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional Information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span>Save</span>
                </button>

            </form>
        </Modal>
    );
}
