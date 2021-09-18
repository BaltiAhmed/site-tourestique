import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Authcontext } from "../../context/auth-context";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const AjoutTransport = (props) => {
  const classes = useStyles();

  const [type, setType] = useState();
  const [prix, setPrix] = useState();
  const [depart, setDepart] = useState();
  const [temps, setTemps] = useState();
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  const onchange = (e) => {
    if (e.target.name === "type") {
      setType(e.target.value);
    } else if (e.target.name === "prix") {
      setPrix(e.target.value);
    } else if (e.target.name === "depart") {
      setDepart(e.target.value);
    } else if (e.target.name === "temps") {
      setTemps(e.target.value);
    }
  };

  const auth = useContext(Authcontext);

  const submit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:5000/api/transport/ajout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          prix: prix,
          depart: depart,
          temps: temps,
          idSite:auth.user._id
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        seterror(responsedata.message);
        throw new Error(responsedata.message);
      }
      setsuccess("Votre demande est enregistrée")

    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <Form.Row>
                <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    onChange={onchange}
                    required
                  >
                    <option></option>
                    <option>1</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Prix(DT)</Form.Label>
                  <Form.Control
                    placeholder="Prix"
                    type="number"
                    name="prix"
                    onChange={onchange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Depart</Form.Label>
                <Form.Control
                  placeholder="Depart"
                  name="depart"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Temps(h)</Form.Label>
                <Form.Control
                  placeholder="Temps"
                  type="number"
                  name="temps"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Ajouter
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};
export default AjoutTransport;
