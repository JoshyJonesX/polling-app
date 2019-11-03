import { connect } from 'react-redux'
import { authUser } from "../store/actions/auth"
import { removeError } from "../store/actions/errors"
import {
    createGridActionFaculty,
    createGridActionDepartment,
    createGridActionElection
} from "../store/actions/grid"
import { 
    createFaculty,
    getFaculties,
    editFaculty,
    deleteFaculty
  } from "../store/actions/faculties"
import { 
    createDepartment,
    getDepartments,
    editDepartment,
    deleteDepartment
  } from "../store/actions/departments"
import { 
    createElection,
    getElections,
    editElection,
    deleteElection,
  } from "../store/actions/elections"
import { withRouter } from "react-router-dom"
import ResponsiveDrawer from "../components/Layout"
import FacultyGridContainerComponent from "../components/Admin/Faculties/FacultyGridContainer"
import DepartmentGridContainerComponent from "../components/Admin/Departments/DepartmentsGridContainer"
import ElectionsGridContainerComponent from "../components/Admin/Elections/ElectionsGridContainer"

const matchDispatchToProps = () =>
    dispatch => ({
        onExpandedRowIdsChangeFaculty: expandedRowIds => dispatch(createGridActionFaculty('expandedRowIds', expandedRowIds)),
        onExpandedGroupsChangeFaculty: expandedGroups => dispatch(createGridActionFaculty('expandedGroups', expandedGroups)),
        onValueChangeFaculty: searchValue => dispatch(createGridActionFaculty('searchValue', searchValue)),
        onEditingRowIdsChangeFaculty: editingRowIds => dispatch(createGridActionFaculty('editingRowIds', editingRowIds)),
        onRowchangesChangeFaculty: rowChanges => dispatch(createGridActionFaculty('rowChanges', rowChanges)),
        onCurrentPageChangeFaculty: currentPage => dispatch(createGridActionFaculty('currentPage', currentPage)),
        onPageSizeChangeFaculty: pageSize => dispatch(createGridActionFaculty('pageSize', pageSize)),
        onAddedRowsChangeFaculty:addedRows => dispatch(createGridActionFaculty('addedRows', addedRows)),
        onSortingChangeFaculty:sorting => dispatch(createGridActionFaculty('sorting', sorting)),
        onGroupingChangeFaculty:grouping => dispatch(createGridActionFaculty('grouping', grouping)),
        onColumnOrderChangeFaculty:order => dispatch(createGridActionFaculty('columnOrder', order)),
        onColumnWidthsChangeFaculty:widths => dispatch(createGridActionFaculty('columnWidths', widths)),
        onExpandedRowIdsChangeFaculty:expandedRowIds => dispatch(createGridActionFaculty('expandedRowIds', expandedRowIds)),

        onExpandedRowIdsChangeElection: expandedRowIds => dispatch(createGridActionElection('expandedRowIds', expandedRowIds)),
        onExpandedGroupsChangeElection: expandedGroups => dispatch(createGridActionElection('expandedGroups', expandedGroups)),
        onValueChangeElection: searchValue => dispatch(createGridActionElection('searchValue', searchValue)),
        onEditingRowIdsChangeElection: editingRowIds => dispatch(createGridActionElection('editingRowIds', editingRowIds)),
        onRowchangesChangeElection: rowChanges => dispatch(createGridActionElection('rowChanges', rowChanges)),
        onCurrentPageChangeElection: currentPage => dispatch(createGridActionElection('currentPage', currentPage)),
        onPageSizeChangeElection: pageSize => dispatch(createGridActionElection('pageSize', pageSize)),
        onAddedRowsChangeElection: addedRows => dispatch(createGridActionElection('addedRows', addedRows)),
        onSortingChangeElection: sorting => dispatch(createGridActionElection('sorting', sorting)),
        onGroupingChangeElection: grouping => dispatch(createGridActionElection('grouping', grouping)),
        onColumnOrderChangeElection: order => dispatch(createGridActionElection('columnOrder', order)),
        onColumnWidthsChangeElection: widths => dispatch(createGridActionElection('columnWidths', widths)),
        onExpandedRowIdsChangeElection: expandedRowIds => dispatch(createGridActionElection('expandedRowIds', expandedRowIds)),
        
        onExpandedRowIdsChangeDepartment: expandedRowIds => dispatch(createGridActionDepartment('expandedRowIds', expandedRowIds)),
        onExpandedGroupsChangeDepartment: expandedGroups => dispatch(createGridActionDepartment('expandedGroups', expandedGroups)),
        onValueChangeDepartment: searchValue => dispatch(createGridActionDepartment('searchValue', searchValue)),
        onEditingRowIdsChangeDepartment: editingRowIds => dispatch(createGridActionDepartment('editingRowIds', editingRowIds)),
        onRowchangesChangeDepartment: rowChanges => dispatch(createGridActionDepartment('rowChanges', rowChanges)),
        onCurrentPageChangeDepartment: currentPage => dispatch(createGridActionDepartment('currentPage', currentPage)),
        onPageSizeChangeDepartment: pageSize => dispatch(createGridActionDepartment('pageSize', pageSize)),
        onAddedRowsChangeDepartment: addedRows => dispatch(createGridActionDepartment('addedRows', addedRows)),
        onSortingChangeDepartment: sorting => dispatch(createGridActionDepartment('sorting', sorting)),
        onGroupingChangeDepartment: grouping => dispatch(createGridActionDepartment('grouping', grouping)),
        onColumnOrderChangeDepartment: order => dispatch(createGridActionDepartment('columnOrder', order)),
        onColumnWidthsChangeDepartment: widths => dispatch(createGridActionDepartment('columnWidths', widths)),
        onExpandedRowIdsChangeDepartment: expandedRowIds => dispatch(createGridActionDepartment('expandedRowIds', expandedRowIds)),

        createFaculty: faculty => dispatch(createFaculty(faculty)),
        getFaculties: () => dispatch(getFaculties()),
        editFaculty: faculty => dispatch(editFaculty(faculty)),
        deleteFaculty: faculty => dispatch(deleteFaculty(faculty)),
        createDepartment: department => dispatch(createDepartment(department)),
        getDepartments: () => dispatch(getDepartments()),
        editDepartment: department => dispatch(editDepartment(department)),
        deleteDepartment: department => dispatch(deleteDepartment(department)),
        createElection: election => dispatch(createElection(election)),
        getElections: () => dispatch(getElections()),
        editElection: election => dispatch(editElection(election)),
        deleteElection: election => dispatch(deleteElection(election)),
    })

export const Layout = withRouter(connect(null,null)(ResponsiveDrawer))

export const FacultyGridContainer = connect(
    state => 
        ({
            faculties: state.faculties,
            errors: state.errors,
            grid: {
                ...state.facultyGrid,
                columnOrder: ['name', 'abv', 'nod', 'noe']},
                columnWidths: [
                    { columnName: 'name', width: 200 },
                    { columnName: 'abv', width: 100 },
                    { columnName: 'nod', width: 200 },
                    { columnName: 'noe', width: 170 }
                ],
        }),
        matchDispatchToProps
)(FacultyGridContainerComponent)

export const DepartmentGridContainer = connect(
    state => 
        ({
            faculties: state.faculties,
            departments: state.departments,
            errors: state.errors,
            grid: {
                ...state.departmentGrid,
                columnOrder: ['name', 'abv', 'faculty', 'nos', 'noe'],
                columnWidths: [
                    { columnName: 'name', width: 200 },
                    { columnName: 'abv', width: 100 },
                    { columnName: 'faculty', width: 150 },
                    { columnName: 'nos', width: 200 },
                    { columnName: 'noe', width: 170 }
                ],
            }
        }),
        matchDispatchToProps
)(DepartmentGridContainerComponent)

export const ElectionGridContainer = connect(
    state => 
        ({
            faculties: state.faculties,
            departments: state.departments,
            elections: state.elections,
            errors: state.errors,
            grid: {
                rows: [],
                ...state.electionGrid,
                columnOrder: ['name', 'for', 'noc', 'active'],
                columnWidths: [
                    { columnName: 'name', width: 300 },
                    { columnName: 'for', width: 100 },
                    { columnName: 'noc', width: 200 },
                    { columnName: 'active', width: 170 }
                ],
            }
        }),
        matchDispatchToProps
)(ElectionsGridContainerComponent)