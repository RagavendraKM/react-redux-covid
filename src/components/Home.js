import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStateResults, sortColumn, searchValue, loadNewPage } from '../redux';
import { withStyles } from "@material-ui/core/styles";
import {
    TableBody, Table, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from '@material-ui/core';
import '../App.css'
import DistrictDetail from './DistrictDetail';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14,
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover
        },
        "&:hover": {
            zIndex: 4,
        },
        zIndex: "4"
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.focus
        }
    }
}))(TableRow);

const toggleDistrictDiv = (stateName) => {
    var x = document.getElementById(stateName);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function Home(props) {
    let result = props.resultData.result;
    useEffect(() => {
        setTimeout(() => props.fetchStateResults(), 5000)
    }, [])                      // If second arg is empty array, it will be dispatched only once.

    const searchByValue = e => {
        let input = e.target.value;
        props.searchValue(input);
    }

    const nextPage = (value) => {
        props.loadNewPage(1);
    }

    const previousPage = (value) => {
        props.loadNewPage(-1);
    }

    return props.resultData.loading ? (
        <h2 style={{ textAlign: "center" }}>Loading....</h2>
    ) : props.resultData.error ? (
        <h2 style={{ textAlign: "center" }}>{props.resultData.error}</h2>
    ) : (
                <div style={{
                    textAlign: "center", fontFamily: "archia"
                }}>
                    <p style={{ color: "#007bff", fontWeight: "900", font: "28px" }}>COVID19INDIA</p>
                    <p>{Date().slice(4, 24) + " IST"}</p>
                    <input type="text" placeholder="Search" onChange={e => searchByValue(e)} />
                    <div>
                        {
                            <TableContainer component={Paper}>
                                <Table className="table">
                                    {
                                        (props.resultData.result.statewise)
                                            .map(row => (
                                                row.state === 'Total' ?
                                                    < TableHead className="header">
                                                        <TableRow>
                                                            <StyledTableCell onClick={() => props.sortColumn('state', props.resultData.orderBy)}>STATE</StyledTableCell>
                                                            <StyledTableCell align="right"
                                                                onClick={() => props.sortColumn('confirmed', props.resultData.orderBy)}>CONFIRMED    ({row.confirmed})
                                                            <div style={{ color: "red" }}>
                                                                    (↑{props.resultData.result.cases_time_series[props.resultData.result.cases_time_series.length - 1].dailyconfirmed})
                                                            </div>
                                                            </StyledTableCell>

                                                            <StyledTableCell align="right"
                                                                onClick={() => props.sortColumn('active', props.resultData.orderBy)}>ACTIVE    ({row.active})
                                                        </StyledTableCell>
                                                            <StyledTableCell align="right"
                                                                onClick={() => props.sortColumn('recovered', props.resultData.orderBy)}>RECOVERED    ({row.recovered})
                                                        <div style={{ color: "green" }}>
                                                                    (↑{props.resultData.result.cases_time_series[props.resultData.result.cases_time_series.length - 1].dailyrecovered})
                                                        </div>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right"
                                                                onClick={() => props.sortColumn('deaths', props.resultData.orderBy)}>DEATHS    ({row.deaths})
                                                        <div style={{ color: "grey" }}>
                                                                    (↑{props.resultData.result.cases_time_series[props.resultData.result.cases_time_series.length - 1].dailydeceased})
                                                        </div>
                                                            </StyledTableCell>

                                                        </TableRow>
                                                    </TableHead>
                                                    : ''
                                            ))
                                    }
                                    {props.resultData && props.resultData.result.statewise &&
                                        (props.resultData.filteredResult || props.resultData.result.statewise)
                                            .map((row, i) => (
                                                row.state !== 'Total' ?
                                                    <TableBody key={i}>
                                                        <StyledTableRow key={i} onClick={() => toggleDistrictDiv(row.state)}>
                                                            <StyledTableCell component="th" scope="row">
                                                                {row.state}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right">{row.confirmed}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.active}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.recovered}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.deaths}</StyledTableCell>
                                                        </StyledTableRow>

                                                        <div id={row.state} style={{ display: "none" }}>

                                                            <DistrictDetail stateName={row.state}></DistrictDetail>
                                                        </div>
                                                    </TableBody>
                                                    : ""
                                            ))
                                    }
                                </Table>
                            </TableContainer >
                        }
                    </div >
                    <section className='section'>
                        <div className='container'>
                            <nav className="pagination" role="navigation" aria-label="pagination">
                                <button className="button pagination-previous" id="previous"
                                    disabled={props.resultData.currentPage === 1}
                                    onClick={() => previousPage()} >Previous
                            </button>
                                <button className="button pagination-next" id="next"
                                    disabled={props.resultData.currentPage === props.resultData.totalPages}
                                    onClick={() => nextPage()}>Next page
                            </button>
                            </nav>
                        </div>
                    </section>
                </div >
            )
}

const mapStateToProps = state => {
    return {
        resultData: state.covid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStateResults: () => dispatch(fetchStateResults()),
        sortColumn: (key, orderBy) => dispatch(sortColumn(key, orderBy)),
        searchValue: (value) => dispatch(searchValue(value)),
        loadNewPage: (value) => dispatch(loadNewPage(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)