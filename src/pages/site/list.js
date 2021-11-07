import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Link } from "react-router-dom";
import AjoutBTN from "../../components/btnAjout";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EventIcon from "@material-ui/icons/Event";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ListSite = (props) => {
  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/site/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.sites);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list);

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={12}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell align="right">Nom</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Tel</StyledTableCell>

                    <StyledTableCell align="right">Adresse</StyledTableCell>
                    <StyledTableCell align="right">Gouvernorat</StyledTableCell>
                    <StyledTableCell align="right">Categorie</StyledTableCell>
                    <StyledTableCell align="right">Capacité</StyledTableCell>
                    <StyledTableCell align="right">Description</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list &&
                    list.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          <Image
                            src={`http://localhost:5000/${row.photo}`}
                            roundedCircle
                            style={{ width: "50px", height: "50px" }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.nom}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.tel}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.adresse}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.gouvernorat}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.categorie}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.capacite}
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          {row.description}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Link to={`/evenements/${row._id}`}>
                            <EventIcon style={{ color: "green" }} />
                          </Link>
                          <Link to={`/liste-BonPlan/${row._id}`}>
                            <CardGiftcardIcon style={{ color: "blue" }} />
                          </Link>
                          <Link to={`/liste-transport/${row._id}`}>
                            <LocalTaxiIcon style={{ color: "yellow" }} />
                          </Link>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListSite;
