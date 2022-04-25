import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Card,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

const UserProfile = (props) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userBookings, setUserBookings] = useState();
  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User: ", user);
    if (user !== null && user !== undefined) {
      setUserInfo(user);
      console.log(userInfo);
      // axios.get(`http://localhost:3000/users/${userInfo.username}`)
      axios.get("http://localhost:3000/users/pdabre12").then((res) => {
        if (res.status === 200) {
          console.log(res.data.data[0]);
          setUserDetails(res.data.data[0]);
        } else {
          history.push("/login");
          document.location.reload();
        }
      });

      axios.get("http://localhost:3000/bookings").then((res) => {
        const user_bookings = [];
        if (res.status === 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].customer_name == "pdabre12") {
              user_bookings.push(res.data.data[i]);
            }
          }
          console.log(res.data.data)

          setUserBookings(user_bookings);
        } else {
          history.push("/login");
          document.location.reload();
        }
      });
    } else {
      history.push("/login");
      document.location.reload();
    }
  }, []);

  return (
    <>
      {userDetails ? (
        <>
          <div
            style={{
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3 style={{ padding: "20px" }}>
              <em>Welcome Onboard, {userDetails.user_name}</em>
            </h3>
          </div>
          {/* <hr style={{ margin: "0px" }} /> */}
          <Row
            style={{
              display: "flex",
              width: "100vw",
              marginTop: "20px",
              paddingTop: "5px",
              backgroundColor: "#f1f1f1",
            }}
          >
            {/* <Col>
              <Col className="miles-card" style={{ padding: "45px" }}>
                <h4>
                  <em>fhMiles</em> Member
                </h4>

                <div style={{ paddingTop: "30px" }}>
                  <h4>
                    <em>{userDetails.miles}</em>
                    <p>status miles</p>
                  </h4>
                </div>
                <div>
                  <p>
                    {`You still require ${
                      40000 - userDetails.miles
                    } status miles or 28 flight segments for qualification as a Frequent Traveller.`}
                  </p>
                </div>
              </Col> */}
            <Col className="userprofile-card">
              <h4>Profile</h4>
              <br />
              <h6>UserName</h6>
              <p>{userDetails.user_name}</p>
              <h6>User Id</h6>
              <p>{userDetails.user_id}</p>
              <h6>Email</h6>
              <p>{userDetails.user_email}</p>
              <h6>Phone Number</h6>
              <p>{userDetails.user_phone}</p>
            </Col>
            <Col>
              <Col className="user-bookings-card">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>Rides History</h4>
                </div>
                {userBookings === null ||
                userBookings === undefined ||
                userBookings.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "30px" }}>
                    {console.log({ userBookings })}
                    You have not booked any rides yet.
                  </div>
                ) : (
                  <>
                    <div>
                      {console.log({ userBookings })}
                      {userBookings?.map((item, index) => {
                        const isActive = item?.status !== "ACTIVE";
                        return (
                          <Card>
                            <Card.Header>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <em>{`Booking Id. ${item.booking_id}`}</em>
                                {isActive && (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: "green",
                                      fontSize: "0.7rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    COMPLETED
                                  </p>
                                )}
                              </div>
                            </Card.Header>
                            <Card.Body
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <div>
                                  <ListGroup variant="flush">
                                    <ListGroup.Item>
                                      Ride booking time:{item?.reserve_time}
                                    </ListGroup.Item>
                                   
                                    <ListGroup.Item>
                                      Ride start location:{item?.start_loc}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      Ride destination location:{item?.destination_loc}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      Ride Car ID:{item?.b_car_id}
                                    </ListGroup.Item>
                                    
                                  </ListGroup>
                                </div>
                              </div>
                              {/* <div>
                                <div
                                  style={{
                                    color: "green",
                                    textAlign: "right",
                                    textDecoration: isActive
                                      ? "line-through"
                                      : "",
                                  }}
                                >{`+ ${item.milesEarned} miles`}</div>
                                <div
                                  style={{
                                    color: "red",
                                    textAlign: "right",
                                    textDecoration: isActive
                                      ? "line-through"
                                      : "",
                                  }}
                                >{`- ${item.milesUsed} miles`}</div>
                              </div> */}
                            </Card.Body>
                          </Card>
                        );
                      })}
                    </div>
                  </>
                )}
              </Col>
            </Col>
          </Row>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </>
  );
};
export default UserProfile;
