import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RoomCard = ({ room }) => {
  return (
    <div className="room-single-card">

      <p
        className="state"
        style={{
          color: room.status === "available" ? "#00ff0d" : "#ff0000",
        }}
      >
        {room.status}
      </p>

      <img className="img-room-card" src={room.image} alt="" />

      <h3 className="id-room-card">
        Room NO : {room.number}
      </h3>

      <p className="info-room-card">{room.info}</p>

      <p className="star-card">
        <FontAwesomeIcon icon={faStar} /> {room.rating}
      </p>

      <span className="price-room-card">
        Price-Per night : ${room.price}
      </span>

      
      
    </div>
  );
};

export default RoomCard;