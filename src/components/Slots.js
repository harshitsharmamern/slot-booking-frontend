import {React, useContext, useState, useEffect, useRef, createRef} from 'react'
import AreaContext from '../context/AreaContext';
import SlotStruc from './SlotStruc';
import { useNavigate } from 'react-router-dom';

const Slots = () => {
    
    const context = useContext(AreaContext);
    const navigate = useNavigate();
    const ref = useRef(null);
    const refClose = useRef(null);
    const {area, setArea} = context;
    let temp_area = null;
    // const host = process.env.NODE_ENV === 'production' ? 'https://evalleyhackathon.herokuapp.com' : 'http://localhost:5000';
    // const host = 'http://localhost:5000'
    const host = 'https://slot-booking-backend.onrender.com';


    const [slots, setSlots] = useState([]);

    useEffect(() => {
        let data;
        data = {"areaID": area._id};
        fetch(`${host}/api/getslots`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((dataa) => {
                // console.log('From slots component:', dataa);
                setSlots(dataa);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])
    // let clickedSlotNumber;
    const [clickedSlott, setClickedSlott] = useState({id: "", number: null, reff: null});

    const handleClickOnSlot = (clickedSlot, reff)=>{
        // reff.current.style.backgroundColor = "#e28743";
        console.log("Clicked on slot", clickedSlot);
        console.log("Area of this slot: ", area._id);
        // Check if user is logged in
        
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
        else if(clickedSlot.isBooked){
            console.log("This slot is already booked");
        }
        else{
            setClickedSlott({id: clickedSlot._id, number: clickedSlot.number, reff: reff});
            ref.current.click();
        }
    }

    const handleConfirm = ()=>{
        refClose.current.click();
        // Book the slot with number clickedSlott and area id area._id
        const authToken = localStorage.getItem('token');
        const data = {areaID: area._id, slotnumber: clickedSlott.number};
        fetch(`${host}/api/auth/bookslot`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((dataa) => {
                console.log('Successfull:', dataa);
                if(dataa.success){
                    clickedSlott.reff.current.style.backgroundColor = "#e28743";
                }
                else{
                    alert(dataa.msg);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const myRefs = useRef([]);
    myRefs.current = slots.map((element, i) => myRefs.current[i] ?? createRef());

  return (
    <div>
        <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="exampleModalLabel">
                <h4>Confirm booking </h4>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="my-3">
                <div className="mb-3">
                  <h5>Slot number: <b>{clickedSlott.number}</b> </h5>
                </div>
                <div className="mb-3">
                  <h5>Area name: <b>{area.name}</b></h5>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose}
              >
                Close
              </button>
              <button
                onClick={handleConfirm}
                type="button"
                className="btn btn-primary"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
        <h3 className='my-5'><b>Area:</b>  {area.name}</h3>
        <h3 className='my-5'><b>Address:</b> {area.address}</h3>
        <hr className='my-5'/>
        <h3 className='my-5'>Pick a slot you want to book-</h3>
        {/* <hr className='my-5'/> */}
        
        {slots.map((slot,i) => {
          return (
            <SlotStruc key={slot._id} reff = {myRefs.current[i]} slot={slot} areaID={area._id} handleClickOnSlot={handleClickOnSlot} />
          );
        })}
    </div>
  )
}

export default Slots