import { Col, Row } from 'antd'
import React from 'react'
import "../resources/bus.css"

function SeatSelection({
  selectedSeat , setSelectedSeat ,bus
}) {
  const capacity = bus.capacity;
  const selectOrUnSelectSeat = (seatNumber) => {
    if(selectedSeat.includes(seatNumber)){
      setSelectedSeat(selectedSeat.filter((seat) => seat != seatNumber))
    }
    else{
      setSelectedSeat([...selectedSeat ,seatNumber])
    }
  }
  return (
    <div >
      <div className="bus-container">
      <Row gutter={[10,10]}>
          {Array.from(Array(capacity).keys()).map((seat) => {
            {
              let seatClass = ""
              if (selectedSeat.includes(seat + 1)){
                seatClass = "selectedSeat"
              }else if(bus.seatsBooked.includes(seat + 1)){
           
                seatClass = "bookedSeat"
              }
              return <Col span = {6}>
                <div className={`${seatClass} seat`} onClick={() => selectOrUnSelectSeat(seat + 1)}>{ seat + 1}</div>
            </Col>}
          })}
      </Row> 
      </div>
    </div>
  )
}

export default SeatSelection