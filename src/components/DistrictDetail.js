import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDistrictResults, searchDistrictValue } from '../redux';
import { withStyles } from "@material-ui/core/styles";
import {
    TableBody, Table, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from '@material-ui/core';

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

const DistrictDetail = (props) => {

    const {resultDistrict, fetchDistrictResults, searchDistrictValue} = props;
    const distResult = resultDistrict.distResult;
    useEffect(() => {
        fetchDistrictResults()
    }, [])

    const searchByDistrictValue = e => {
        let input = e.target.value;
        searchDistrictValue(input, props.stateName);
    }
    return (
        <div>
            {
                <TableContainer component={Paper}>
                    <Table className="table">
                        <TableHead className="header">
                            <TableRow>
                                <StyledTableCell>DISTRICT</StyledTableCell>

                                <StyledTableCell align="right">CONFIRMED</StyledTableCell>

                                <StyledTableCell align="right">ACTIVE</StyledTableCell>

                                <StyledTableCell align="right">RECOVERED</StyledTableCell>

                                <StyledTableCell align="right">DEATHS</StyledTableCell>

                            </TableRow>
                            <input type="text" placeholder="Search" onChange={e => searchByDistrictValue(e)} />
                        </TableHead>
                        {
                            distResult && distResult[props.stateName] && distResult[props.stateName]["districtData"]
                                 ?
                                (
                                    Object.keys(distResult[props.stateName]["districtData"])
                                        .map((d, i) => {
                                            return (
                                                <TableBody key={i}>
                                                    <StyledTableRow>
                                                        <StyledTableCell component="th" scope="row">{d}</StyledTableCell>
                                                        <StyledTableCell align="right" > {distResult[props.stateName]["districtData"][d].confirmed}</StyledTableCell>
                                                        <StyledTableCell align="right">{distResult[props.stateName]["districtData"][d].active}</StyledTableCell>
                                                        <StyledTableCell align="right">{distResult[props.stateName]["districtData"][d].recovered}</StyledTableCell>
                                                        <StyledTableCell align="right">{distResult[props.stateName]["districtData"][d].deceased}</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableBody>
                                            )
                                        }
                                        )) : <p>No result.....</p>
                        }
                    </Table >
                </TableContainer >
            }
        </div >
    )
}

const mapStateToProps = state => {
    return {
        resultDistrict: state.covid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDistrictResults: () => dispatch(fetchDistrictResults()),
        searchDistrictValue: (value, stateName) => dispatch(searchDistrictValue(value, stateName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistrictDetail)