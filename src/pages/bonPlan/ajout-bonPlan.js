import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {Authcontext} from '../../context/auth-context'
import {useParams} from 'react-router-dom'

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

const AjoutBonPlan = (props) => {
  const classes = useStyles();

  const [nom, setNom] = useState();
  const [type, setType] = useState();
  const [dateDebut, setDateDebut] = useState();
  const [dateFin, SetDateFin] = useState();
  const [description, setDescription] = useState();
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "type") {
      setType(e.target.value);
    } else if (e.target.name === "dateDebut") {
      setDateDebut(e.target.value);
    } else if (e.target.name === "dateFin") {
      SetDateFin(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const auth = useContext(Authcontext)
  const id = useParams().id

  const submit = async (e) => {
    e.preventDefault();
    try {
        let response = await fetch("http://localhost:5000/api/bonplan/ajout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titre: nom,
            type: type,
            description: description,
            Ddebut: dateDebut,
            Dfin: dateFin,
            IdUser:id
          }),
        });
        let responsedata = await response.json();
        if (!response.ok) {
          seterror(responsedata.message)
          throw new Error(responsedata.message);
        }
        setsuccess("Bon Plan Bien ajouter")

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
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    placeholder="Nom"
                    name="nom"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                  <Form.Label>type</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    onChange={onchange}
                    required
                  >
                    <option></option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <TextField
                  id="datetime-local"
                  label="Date debut"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  name="dateDebut"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onchange}
                  required
                />

                <TextField
                  id="datetime-local"
                  label="Date fin"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="dateFin"
                  onChange={onchange}
                  required
                />
              </Form.Row>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
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
export default AjoutBonPlan;
