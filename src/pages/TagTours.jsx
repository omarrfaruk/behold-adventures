import React, { useEffect } from "react";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toursByTag } from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";
import { excerpt } from "../utils/Excerpt";

const TagTours = () => {

    const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tag } = useParams();

    useEffect(() => {
        if (tag) {
            dispatch(toursByTag(tag));
        }
    }, [tag, dispatch]);

    if (loading) {
        return <Spinner />;
    }


    return (
        <div>
            <div
                style={{
                    margin: "auto",
                    padding: "120px",
                    maxWidth: "900px",
                    alignContent: "center",
                }}
            >
                <h3 className="text-center">Tours with tag: {tag}</h3>
                <hr style={{ maxWidth: "570px" }} />
                {tagTours &&
                    tagTours.map((item) => (
                        <MDBCardGroup key={item._id}>
                            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
                                <MDBRow className="g-0">
                                    <MDBCol md="4">
                                        <MDBCardImage
                                            className="rounded"
                                            src={item.imageFile}
                                            alt={item.title}
                                            fluid
                                        />
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody>
                                            <MDBCardTitle className="text-start">
                                                {item.title}
                                            </MDBCardTitle>
                                            <MDBCardText className="text-start">
                                                {excerpt(item.description, 40)}
                                            </MDBCardText>
                                            <div style={{ float: "left", marginTop: "-10px" }}>
                                                <MDBBtn
                                                    size="sm"
                                                    rounded
                                                    color="info"
                                                    onClick={() => navigate(`/tour/${item._id}`)}
                                                >
                                                    Read More
                                                </MDBBtn>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCardGroup>
                    ))}
            </div>
        </div>
    );
};

export default TagTours;