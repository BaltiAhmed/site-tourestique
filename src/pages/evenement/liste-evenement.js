import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col } from "react-bootstrap";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TablePagination from "@material-ui/core/TablePagination";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import { Link } from "react-router-dom";
import AjoutBTN from "../../components/btnAjout";
import {Authcontext} from  '../../context/auth-context'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ListEvenement() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const auth = useContext(Authcontext)

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/evenement/site/${auth.user._id}`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.evenement);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={10}>
          <ErrorModel error={error} />
          <SuccessModel success={success} />
          <Link to="/ajout-evenement" >
          <AjoutBTN title="Ajouter un service"/>
          </Link>
          
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell align="right">Titre</StyledTableCell>
                  <StyledTableCell align="right">Date de début</StyledTableCell>
                  <StyledTableCell align="right">Date de fin</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list &&
                  list
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.photo}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.titre}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.Ddebut}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.Dfin}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.type}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.description}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Link to={`/update-evenement/${row._id}`}>
                            <UpdateIcon style={{ color: "green" }} />
                          </Link>
                          <DeleteForeverIcon
                            style={{ color: "red" }}
                            onClick={async (event) => {
                              try {
                                let response = await fetch(
                                  `http://localhost:5000/api/evenement/${row._id}`,
                                  {
                                    method: "DELETE",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }
                                );
                                let responsedata = await response.json();
                                if (!response.ok) {
                                  throw new Error(responsedata.message);
                                }
                                setList(
                                  list.filter((el) => el._id !== row._id)
                                );
                                setsuccess("Evenement bien suprimer");
                              } catch (err) {
                                console.log(err);
                                seterror(err.message || "il y a un probleme");
                              }
                            }}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={list && list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
